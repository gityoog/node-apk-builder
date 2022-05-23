enum Type {
  WAITING = 0,
  RUNNING = 1,
  SUCCESS = 2,
  FAILED = 3,
  CANCELED = 4,
  DESTROY = 5
}

type updateData = {
  type: Type
  data: string[]
  error: string
}

namespace TaskStatus {
  export type type = Type
  export type UpdateData = updateData
}

class TaskStatus {
  static Type = Type
  private type: number = Type.WAITING
  private data: string[] = []
  private error = ''
  private updateTime = Date.now()

  get() {
    return {
      type: this.type,
      data: this.data,
      error: this.error,
      updateTime: this.updateTime
    }
  }

  isRunning() {
    return this.type === Type.RUNNING
  }

  isWaiting() {
    return this.type === Type.WAITING
  }

  private _log?: (value: string) => void
  log(value: string) {
    const text = value.trimEnd()
    this.data.push(text)
    this._log?.(text)
    this.update()
  }

  onLog(callback: (value: string) => void) {
    this._log = callback
  }

  run() {
    this.type = Type.RUNNING
    this.log('starting')
  }

  success() {
    this.type = Type.SUCCESS
    this.log('successful')
  }

  fail(err: string) {
    this.type = Type.FAILED
    this.error = err
    this.log(`failed: ${err}`)
  }

  cancel() {
    this.type = Type.CANCELED
    this.log(`cancel`)
  }

  private _update?: () => void
  private update() {
    this.updateTime = Date.now()
    this._update?.()
  }
  onUpdate(callback: () => void) {
    this._update = callback
  }

  destroy() {
    this.type = Type.DESTROY
    this._update = undefined
    this._log = undefined
    this.data = []
    this.error = ''
  }
}

export default TaskStatus