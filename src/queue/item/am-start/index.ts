import ApkBuilderConfig from "../../../config"
import BaseQueueItem from "../base"
import { FactoryExecTask } from "../../task/factory"

export default class AmStartQueueItem extends BaseQueueItem {
  static create() {
    return new this
  }
  task(config: ApkBuilderConfig) {
    return FactoryExecTask('am start', ["adb", "shell am start", "-n", config.adb!.main])
  }
}