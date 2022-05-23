import zipalign from "../../android-tools/zipalign"
import ApkBuilderConfig from "../../../config"
import BaseQueueItem from "../base"

export default class AlignQueueItem extends BaseQueueItem {
  static create() {
    return new this
  }
  task(config: ApkBuilderConfig) {
    return zipalign({ apk: config.apk })
  }
}