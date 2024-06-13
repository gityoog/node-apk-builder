import d8 from "../../android-tools/d8"
import ApkBuilderConfig from "../../../config"
import BaseQueueItem from "../base"

export default class D8QueueItem extends BaseQueueItem {
  static create() {
    return new this
  }
  task(config: ApkBuilderConfig) {
    return d8(() => ({
      classpath: config.androidJar,
      output: config.outpath,
      inputs: config.getClassesFiles(),
      lib: config.lib
    }))
  }
}