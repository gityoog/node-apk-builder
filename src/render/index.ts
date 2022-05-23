import { Already, Destroy, Inject, Service } from "ioc-di"
import chalk from "chalk"
import logUpdate from "log-update"
import TaskManager from "../queue/task-manager"
import NormalRender from "./normal"
import RenderLoading from "./loading"
import ApkBuilderConfig from "../config"

@Service()
export default class ApkBuilderRender {
  @Inject() private manager!: TaskManager
  @Inject() private loading!: RenderLoading
  @Inject() private config!: ApkBuilderConfig

  private startTime = 0
  private endTime = 0
  private total = 0
  private data: Record<number, {
    value: string
    updateTime: number
  }> = {}
  private isDestroyed = false

  @Already
  private init() {
    this.manager.onUpdate(({ startTime, endTime, tasks }) => {
      if (this.isDestroyed) {
        return
      }
      this.startTime = startTime
      this.endTime = endTime
      this.total = tasks.length
      tasks.forEach(({ name, status }, index) => {
        const item = this.data[index] || {
          updateTime: 0,
          value: ''
        }
        if (!this.data[index]) {
          this.data[index] = item
        }
        if (status.updateTime > item.updateTime) {
          item.updateTime = status.updateTime
          item.value = NormalRender({ name, index, total: this.total, status: status.type, stdout: status.data, error: status.error })
        }
      })

      this.loading.setRef(
        Array(this.total).fill(0).map((_, index) => this.data[index]).map(item => item.value).join('\n')
      )
    })
    this.loading.onUpdate(value => {
      const out = value + `\n\nBuild ${this.endTime ? 'Complete' : 'Time'}: ${chalk.yellow(`${((this.endTime || Date.now()) - this.startTime) / 1000}s`)}`
      if (this._update) {
        this._update(out)
      } else if (this.config.render) {
        logUpdate(
          `─ ${chalk.bgCyan.black(' Apk Builder ')} ─\n\n`
          + out
        )
      }
    })
  }

  private _update?: (value: string) => void
  onUpdate(callback: (value: string) => void) {
    this._update = callback
  }

  constructor() {
    this.init()
  }

  @Destroy
  destroy() {
    this.loading.destroy()
    this.isDestroyed = true
    this._update = undefined
    this.data = null!
  }
}