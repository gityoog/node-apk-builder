import ApkBuilderConfig from "../../../config"
import { FactoryExecTask } from "../../task/factory"
import BaseQueueItem from "../base"

export default class InstallQueueItem extends BaseQueueItem {
  static create() {
    return new this
  }
  task(config: ApkBuilderConfig) {
    return FactoryExecTask('install', ["adb", "install", "-r", config.apk])
  }
}