import BaseQueueItem from "../base"
import ApkBuilderConfig from "../../../config"
import AdmZip from 'adm-zip'
import Task from "../../task"

export function appendApk({ apk, files, folders }: { apk: string, files: { name?: string, path: string, alias?: string }[], folders: { name?: string, path: string }[] }) {
  return new Task({
    name: 'append',
    processer: () => new Promise<void>((resolve, reject) => {
      const zip = new AdmZip(apk)
      files.forEach(file => {
        zip.addLocalFile(file.path, file.name, file.alias)
      })
      folders.forEach(folder => {
        zip.addLocalFolder(folder.path, folder.name)
      })
      zip.writeZip(apk, err => {
        if (err) {
          reject(err.message)
        } else {
          resolve()
        }
      })
    })
  })
}

export default class AppendQueueItem extends BaseQueueItem {
  static dex() {
    const ins = new this
    ins.addDex = true
    return ins
  }
  static assets() {
    const ins = new this
    ins.addAssets = true
    return ins
  }
  private addDex = false
  private addAssets = false
  task(config: ApkBuilderConfig) {
    return appendApk({
      apk: config.apk,
      files: this.addDex ? [{
        path: config.dex,
        alias: undefined as string | undefined
      }].concat(
        config.getLibFiles().length > 0 ? [{
          path: config.jarDex,
          alias: 'classes2.dex'
        }] : []
      ) : [],
      folders: this.addAssets ? [{
        path: config.assets,
        name: 'assets'
      }].concat(
        config.libs ? [{
          path: config.libs,
          name: 'lib'
        }] :
          []).concat(config.resources.map(res => {
            return {
              path: res,
              name: undefined!
            }
          })) : [],
    })
  }
  merge(item: this) {
    this.addDex = this.addDex || item.addDex
    this.addAssets = this.addAssets || item.addAssets
    return this
  }
}
