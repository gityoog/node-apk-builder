import BaseQueueItem from "../base"
import ApkBuilderConfig from "../../../config"
import { link } from "../../android-tools/aapt2"

export default class LinkQueueItem extends BaseQueueItem {
  static create() {
    return new this
  }
  task(config: ApkBuilderConfig) {
    return link(() => ({
      outpath: config.apk,
      rjava: config.code,
      namespace: config.androidJar,
      manifest: config.manifest,
      flat: config.getFlatFiles()
    }), config.encoding.aapt2)
  }
}