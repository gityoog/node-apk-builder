import { compile } from "../../android-tools/aapt2"
import ApkBuilderConfig from "../../../config"
import BaseQueueItem from "../base"

export default class ResQueueItem extends BaseQueueItem {
  static create() {
    return new this
  }
  task(config: ApkBuilderConfig) {
    return compile(() => ({
      outpath: config.outpath,
      res: config.getResFiles()
    }))
  }
}