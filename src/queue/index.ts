import { Destroy, Inject, Service } from "ioc-di"
import ApkBuilderConfig from "../config"
import AlignQueueItem from "./item/align"
import AppendQueueItem from "./item/append"
import CleanQueueItem from "./item/clean"
import D8QueueItem from "./item/d8"
import InstallQueueItem from "./item/install"
import JavacQueueItem from "./item/javac"
import LinkQueueItem from "./item/link"
import ResQueueItem from "./item/res"
import AmStartQueueItem from "./item/am-start"
import SignQueueItem from "./item/sign"
import SortQueueItem from "./item"
import TaskManager from "./task-manager"
import BaseQueueItem from "./item/base"
import AidlQueueItem from "./item/aidl"
import JarD8QueueItem from "./item/jard8"

@Service()
export default class ApkBuilderQueue {
  private map: Map<Object, BaseQueueItem> = new Map
  private lock = false
  buildSource() {
    this.push(
      JavacQueueItem.create(),
      D8QueueItem.create(),
      AppendQueueItem.dex()
    )
  }
  buildManifest() {
    this.push(
      LinkQueueItem.create(),
      AppendQueueItem.dex(),
      AppendQueueItem.assets()
    )
  }
  buildRes() {
    this.push(
      ResQueueItem.create(),
      LinkQueueItem.create(),
      AppendQueueItem.dex(),
      AppendQueueItem.assets()
    )
  }
  buildAssets() {
    this.push(
      AppendQueueItem.assets()
    )
  }
  buildAidl() {
    this.push(
      AidlQueueItem.create(),
      JavacQueueItem.create(),
      D8QueueItem.create(),
      AppendQueueItem.dex()
    )
  }
  all() {
    return this.push(
      CleanQueueItem.create(),
      ResQueueItem.create(),
      LinkQueueItem.create(),
      this.config.aidl ? AidlQueueItem.create() : undefined,
      JavacQueueItem.create(),
      this.config.getLibFiles().length > 0 ? JarD8QueueItem.create() : undefined,
      D8QueueItem.create(),
      AppendQueueItem.dex(),
      AppendQueueItem.assets()
    )
  }
  private push(...data: Array<BaseQueueItem | undefined>) {
    data.forEach(item => {
      if (!item) return
      if (this.map.has(item.constructor)) {
        const old = this.map.get(item.constructor)!
        this.map.set(item.constructor, item.merge(old))
      } else {
        this.map.set(item.constructor, item)
      }
    })
    return this.next()
  }
  @Inject() private tasks!: TaskManager
  @Inject() private config!: ApkBuilderConfig
  private async next() {
    if (!this.lock && this.map.size > 0) {
      this.lock = true
      const tasks = SortQueueItem(
        [...this.map.values()].concat([
          AlignQueueItem.create(),
          SignQueueItem.create()
        ]).concat(
          this.config.adb &&
            this.config.adb.install !== false
            ?
            InstallQueueItem.create() :
            []
        ).concat(
          this.config.adb?.main || this.config.adb?.service ?
            AmStartQueueItem.create() : []
        )
      ).map(item => item.task(this.config))
      this.map.clear()
      await this.tasks.run(tasks)
      this.lock = false
      this.next()
    }
  }

  @Destroy
  destroy() {
    this.map.clear()
  }
}