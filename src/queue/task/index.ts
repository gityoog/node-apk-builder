import TaskStatus from "./status"

type TaskProcesser = (task: {
  log: (data: string) => void
  bindAbort: (callback: () => void) => void
}) => Promise<any>

export default class Task {
  name: string
  private status = new TaskStatus
  private processer: TaskProcesser
  private beforeSuccess?: () => Promise<void>
  constructor({ processer, callback, name }: {
    name: string
    processer: TaskProcesser
    callback?: () => Promise<void>
  }) {
    this.name = name
    this.processer = processer
    this.beforeSuccess = callback
  }

  async start() {
    if (this.status.isWaiting() && this.processer) {
      this.status.run()
      try {
        await this.processer({
          log: value => this.status.log(value),
          bindAbort: (callback) => this.bindAbort(callback)
        })
        if (this.status.isRunning()) {
          if (this.beforeSuccess) {
            await this.beforeSuccess()
          }
          this.status.success()
        }
      } catch (e) {
        const error = e instanceof Error ? e.message : String(e)
        this.status.fail(error)
      }
    }
  }

  onLog(callback: (data: string) => void) {
    this.status.onLog(callback)
  }

  onUpdate(callback: () => void) {
    this.status.onUpdate(callback)
  }

  getStatus() {
    return this.status.get()
  }

  private _abort?: () => void
  bindAbort(callback: () => void) {
    this._abort = callback
  }

  destroy() {
    if (this.status.isRunning() && this._abort) {
      this.status.cancel()
      this._abort()
      this._abort = undefined
    }
    this.processer = undefined!
    this.beforeSuccess = undefined
    this.status.destroy()
  }
}