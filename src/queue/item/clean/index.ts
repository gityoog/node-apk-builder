import ApkBuilderConfig from "../../../config"
import BaseQueueItem from "../base"
import rimraf from "rimraf"
import fs from 'fs'
import Task from "../../task"

export function cleanOutpath({ outpath }: { outpath: string }) {
  return new Task({
    name: 'clean',
    processer: () => new Promise<void>((resolve, reject) => {
      if (fs.existsSync(outpath)) {
        rimraf.sync(outpath)
      }
      fs.mkdir(outpath, err => {
        if (err) {
          reject(err.message)
        } else {
          resolve()
        }
      })
    })
  })
}

export default class CleanQueueItem extends BaseQueueItem {
  static create() {
    return new this
  }
  task(config: ApkBuilderConfig) {
    return cleanOutpath({
      outpath: config.outpath
    })
  }
}
