import { execaCommand } from "execa"
import Task from ".."
import iconv from 'iconv-lite'

export function FactoryExecTask(name: string, arg: string | string[] | (() => string | string[]), callback?: () => Promise<void>, encoding?: string) {
  return new Task({
    name,
    processer: async ({ log, bindAbort }) => {
      arg = typeof arg === 'function' ? arg() : arg
      const command = Array.isArray(arg) ? arg.join(' ') : arg
      const proc = execaCommand(command, {
        env: {
          PATH: process.env.PATH
        },
        shell: false
      })
      if (encoding) {
        if (!iconv.encodingExists(encoding)) {
          encoding = undefined
        }
      }
      const pushLog = (data: any) => {
        log(encoding ? iconv.decode(data, encoding) : String(data))
      }
      proc.stderr?.on('data', (data) => {
        pushLog(data)
      })
      proc.stdout?.on('data', (data) => {
        pushLog(data)
      })
      bindAbort(() => proc.kill())
      return proc
    },
    callback
  })
}