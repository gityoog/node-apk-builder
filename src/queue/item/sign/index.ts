import apksigner from "../../android-tools/apksign"
import ApkBuilderConfig from "../../../config"
import BaseQueueItem from "../base"

export default class SignQueueItem extends BaseQueueItem {
  static create() {
    return new this
  }
  task(config: ApkBuilderConfig) {
    return apksigner({
      apk: config.apk,
      key: config.key,
      cert: config.cert,
      jks: config.jks
    })
  }
}