import { execaCommand } from "execa"
import Task from ".."
import iconv from 'iconv-lite'

export function FactoryProcessTask(name: string, arg: string[][] | (() => string[][]), callback?: () => Promise<void>, encoding?: string) {
  return new Task({
    name,
    processer: async ({ log, bindAbort }) => {
      const args = typeof arg === 'function' ? arg() : arg
      if (encoding) {
        if (!iconv.encodingExists(encoding)) {
          encoding = undefined
        }
      }
      const pushLog = (data: any) => {
        log(encoding ? iconv.decode(data, encoding) : String(data))
      }
      const callbacks: Array<() => void> = []
      bindAbort(() => callbacks.forEach((cb) => cb()))
      return Promise.all(args.map((arg) => {
        const command = Array.isArray(arg) ? arg.join(' ') : arg
        const proc = execaCommand(command, {
          env: {
            PATH: process.env.PATH
          },
          shell: false
        })
        proc.stderr?.on('data', (data) => {
          pushLog(data)
        })
        proc.stdout?.on('data', (data) => {
          pushLog(data)
        })
        callbacks.push(() => proc.kill())
        return proc
      }))
    },
    callback
  })
}