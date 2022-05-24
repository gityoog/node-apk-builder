import { execaCommand } from "execa"
import Task from ".."

export function FactoryExecTask(name: string, arg: string | string[] | (() => string | string[]), callback?: () => Promise<void>) {
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
      proc.stderr?.on('data', (data) => {
        log(String(data))
      })
      proc.stdout?.on('data', (data) => {
        log(String(data))
      })
      bindAbort(() => proc.kill())
      return proc
    },
    callback
  })
}