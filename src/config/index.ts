import { glob } from 'glob'
import path from 'path'

type options = {
  dist: string
  src: string
  androidJar: string
  render?: boolean
  buildTools?: string
  lib?: string[],
  sign: {
    key: string
    cert: string
  }
  adb?: {
    main: string
  }
}

namespace ApkBuilderConfig {
  export type Options = options
}

class ApkBuilderConfig {
  dist: string
  src: string
  key: string
  cert: string
  androidJar: string
  log: string
  adb?: {
    main: string
  }
  lib: string[]
  res: string
  manifest: string
  code: string
  assets: string
  render: boolean
  outpath!: string
  apk!: string
  classes!: string
  dex!: string
  constructor({ dist, src, buildTools, sign, androidJar, adb, render = true, lib = [] }: options) {
    this.src = src
    this.dist = dist
    this.key = sign.key
    this.cert = sign.cert
    this.androidJar = androidJar
    this.adb = adb
    this.render = render
    this.lib = lib
    if (buildTools) {
      process.env.PATH += (isWindows() ? ';' : ':') + `${buildTools}`
    }
    this.res = path.join(this.src, 'res')
    this.manifest = path.join(this.src, 'AndroidManifest.xml')
    this.code = path.join(this.src, 'java')
    this.assets = path.join(this.src, 'assets')
    this.log = path.join(this.dist, 'log.txt')
    this.setMode('release')
  }
  setMode(mode: string) {
    this.outpath = path.join(this.dist, mode)
    this.apk = path.join(this.outpath, 'app.apk')
    this.classes = path.join(this.outpath, 'classes')
    this.dex = path.join(this.outpath, 'classes.dex')
  }
  getResFiles() {
    return glob.sync('**/*.*', {
      cwd: this.res
    }).map(p => path.join(this.res, p))
  }
  getFlatFiles() {
    return glob.sync('**/*.flat', {
      cwd: this.outpath
    }).map(p => path.join(this.outpath, p))
  }
  getJavaFiles() {
    return glob.sync('**/*.java', {
      cwd: this.code
    }).map(p => path.join(this.code, p))
  }
  getClassesFiles() {
    return glob.sync('**/*.class', {
      cwd: this.classes
    }).map(p => path.join(this.classes, p))
  }
}

function isWindows() {
  return process.platform === 'win32' || process.env.OSTYPE && /^(msys|cygwin)$/.test(process.env.OSTYPE)
}

export default ApkBuilderConfig