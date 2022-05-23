import { execaCommand } from "execa"
import Task from ".."

export function FactoryExecTask(name: string, command: string | string[], callback?: () => Promise<void>) {
  return new Task({
    name,
    processer: async ({ log, bindAbort }) => {
      const proc = execaCommand(Array.isArray(command) ? command.join(' ') : command, {
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