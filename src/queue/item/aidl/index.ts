import ApkBuilderConfig from "../../../config"
import aidl from "../../android-tools/aidl"
import BaseQueueItem from "../base"

export default class AidlQueueItem extends BaseQueueItem {
  static create() {
    return new this
  }
  task(config: ApkBuilderConfig) {
    return aidl(() => ({
      inputs: config.getAidlFiles(),
      output: config.code,
      dir: config.aidl!
    }))
  }
}