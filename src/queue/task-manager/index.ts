import { Destroy, Inject, Service } from "ioc-di"
import ApkBuilderLogger from "../../logger"
import Task from "../task"

type updateCallback = (data: {
  startTime: number
  endTime: number
  tasks: {
    name: string
    status: {
      type: number
      data: string[]
      error: string
      updateTime: number
    }
  }[]
}) => void

namespace TaskManager {
  export type UpdateCallback = updateCallback
}

@Service()
class TaskManager {
  @Inject() private logger!: ApkBuilderLogger
  private data: Task[] = []
  private startTime = 0
  private endTime = 0

  async run(tasks: Task[]) {
    this.clear()
    tasks.forEach(task => {
      this.data.push(task)
      task.onLog(value => {
        this.logger.info(task.name, value)
      })
      task.onUpdate(() => {
        this.update()
      })
    })
    this.start()
    for (const task of this.data) {
      await task.start()
    }
    this.end()
  }

  private start() {
    this.endTime = 0
    this.startTime = Date.now()
    this.update()
  }

  private end() {
    this.endTime = Date.now()
    this.update()
  }

  private _update?: updateCallback
  private update() {
    this._update?.({
      startTime: this.startTime,
      endTime: this.endTime,
      tasks: this.data.map(task => ({
        name: task.name,
        status: task.getStatus()
      }))
    })
  }
  onUpdate(callback: updateCallback) {
    this._update = callback
  }

  private clear() {
    this.data.forEach(task => {
      task.destroy()
    })
    this.data = []
  }

  @Destroy
  destroy() {
    this._update = undefined
    this.clear()
  }
}

export default TaskManager