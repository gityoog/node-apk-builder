import ApkBuilderConfig from "../../../config"
import BaseQueueItem from "../base"
import { FactoryExecTask } from "../../task/factory"

export default class AmStartQueueItem extends BaseQueueItem {
  static create() {
    return new this
  }
  task(config: ApkBuilderConfig) {
    const { main, service } = config.adb!
    if (service) {
      return FactoryExecTask('am startservice', ["adb", "shell am startservice", "-n", service])
    } else {
      return FactoryExecTask('am start', ["adb", "shell am start", "-n", main!])
    }
  }
}