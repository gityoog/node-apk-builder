import d8 from "../../android-tools/d8"
import ApkBuilderConfig from "../../../config"
import BaseQueueItem from "../base"

export default class D8QueueItem extends BaseQueueItem {
  static create() {
    return new this
  }
  task(config: ApkBuilderConfig) {
    return d8(() => ({
      lib: config.androidJar,
      output: config.outpath,
      classes: config.classes
    }), config.encoding.d8)
  }
}