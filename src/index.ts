import { Container, Destroy, Inject, Service, Root } from "ioc-di"
import Watchpack from 'watchpack'
import ApkBuilderQueue from "./queue"
import ApkBuilderConfig from "./config"
import ApkBuilderLogger from "./logger"
import ApkBuilderRender from "./render"
import TaskManager from "./queue/task-manager"
import fs from 'fs'

@Service()
export default class ApkBuilder {
  static Create(...args: ConstructorParameters<typeof ApkBuilder>) {
    return new (Root()(this))(...args)
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
    this.config.setProd()
    if (this.config.autoVersion) {
      fs.writeFileSync(this.config.manifest, fs.readFileSync(this.config.manifest, 'utf-8').replace(/android:versionCode="[^"]+"/, (value) => {
        return value.replace(/\d+/, (value) => {
          return String(Number(value) + 1)
        })
      }))
    }
    return this.queue.all()
  }
  private lastAIDL = true
  private watchpack?: Watchpack
  watch() {
    this.config.setDev()
    this.queue.all()
    this.watchpack = new Watchpack({
      aggregateTimeout: 1000,
      ignored: /R\.java/
    })
    this.watchpack.watch([this.config.manifest], [this.config.code, this.config.assets, this.config.res].concat(
      this.config.aidl ? [this.config.aidl] : []
    ))
    this.watchpack.on("aggregated", (changes: Set<string>) => {
      if (changes.has(this.config.manifest)) {
        this.queue.buildManifest()
      }
      if (!this.lastAIDL && changes.has(this.config.code)) {
        this.queue.buildSource()
      }
      if (this.config.aidl && changes.has(this.config.aidl)) {
        this.queue.buildAidl()
        this.lastAIDL = true
      } else {
        this.lastAIDL = false
      }
      if (changes.has(this.config.assets)) {
        this.queue.buildAssets()
      }
      if (changes.has(this.config.res)) {
        this.queue.buildRes()
      }
      this.logger.info("watchpack", [...changes.values()].join(','))
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