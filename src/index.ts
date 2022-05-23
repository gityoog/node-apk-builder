import { Container, Destroy, Inject, Service, Init } from "ioc-di"
import Watchpack from 'watchpack'
import ApkBuilderQueue from "./queue"
import ApkBuilderConfig from "./config"
import ApkBuilderLogger from "./logger"
import ApkBuilderRender from "./render"
import TaskManager from "./queue/task-manager"

// todo aidl 
// todo lib 

@Service()
@Container()
export default class ApkBuilder {
  static Create(...args: ConstructorParameters<typeof ApkBuilder>) {
    return Init(new ApkBuilder(...args))
  }

  @Inject() private queue!: ApkBuilderQueue
  @Inject() private config!: ApkBuilderConfig
  @Inject() private logger!: ApkBuilderLogger
  @Inject() private render!: ApkBuilderRender
  @Inject() private manager!: TaskManager

  /** @deprecated Please use ApkBuilder.Create */
  constructor(options: ApkBuilderConfig.Options) {
    this.config = new ApkBuilderConfig(options)
  }

  build() {
    this.config.setMode('release')
    return this.queue.all()
  }

  private watchpack?: Watchpack
  watch() {
    this.config.setMode('debug')
    this.queue.all()
    this.watchpack = new Watchpack({
      aggregateTimeout: 1000,
      ignored: /R\.java/
    })
    this.watchpack.watch([this.config.manifest], [this.config.code, this.config.assets, this.config.res])
    this.watchpack.on("aggregated", (changes: Set<string>) => {
      if (changes.has(this.config.manifest)) {
        this.queue.buildManifest()
      }
      if (changes.has(this.config.code)) {
        this.queue.buildSource()
      }
      if (changes.has(this.config.assets)) {
        this.queue.buildAssets()
      }
      if (changes.has(this.config.res)) {
        this.queue.buildRes()
      }
    })
  }

  onLog(callback: (value: string) => void) {
    return this.logger.bindOut(callback)
  }

  setRender(callback: (value: string) => void) {
    return this.render.onUpdate(callback)
  }

  setUpdater(callback: TaskManager.UpdateCallback) {
    return this.manager.onUpdate(callback)
  }

  @Destroy
  destroy() {
    this.watchpack?.close()
  }
}