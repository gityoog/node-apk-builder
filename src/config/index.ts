import { glob } from 'glob'
import path from 'path'
import fs from 'fs'
import { valueToJava } from '../util'

type buildConfig = {
  package: string
  env: Record<string, any>
}

type options = {
  dist: string
  src: string
  androidJar: string
  main?: string[]
  render?: boolean
  buildTools?: string
  lib?: string,
  libs?: string
  aidl?: string
  encoding?: {
    javac?: string
    d8?: string
    aapt2?: string
  } | string
  sign: {
    key: string
    cert: string
    jks?: {
      path: string
      alias: string
      pass: string
      aliasPass: string
    }
  }
  buildConfig?: buildConfig
  resources?: string[]
  adb?: {
    install?: boolean
    main?: string
    service?: string
  }
  autoVersion?: boolean
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
  adb
  res: string
  manifest: string
  code: string
  assets: string
  render: boolean
  outpath!: string
  apk!: string
  classes!: string
  dex!: string
  resources
  private lib
  libs
  encoding
  jks
  aidl
  main
  jarDex!: string
  jarD8Out!: string
  buildConfig
  autoVersion
  isDev = false
  isProd = false
  constructor({ dist, src, buildTools, sign, androidJar, adb, render = true, lib, libs, encoding, resources = [], aidl, main, buildConfig, autoVersion = false }: options) {
    this.src = src
    this.main = main
    this.dist = dist
    this.key = sign.key
    this.cert = sign.cert
    this.androidJar = androidJar
    this.adb = adb
    this.render = render
    this.resources = resources
    this.aidl = aidl
    if (buildTools) {
      process.env.PATH += (isWindows() ? ';' : ':') + `${buildTools}`
    }
    this.res = path.join(this.src, 'res')
    this.manifest = path.join(this.src, 'AndroidManifest.xml')
    this.code = path.join(this.src, 'java')
    this.assets = path.join(this.src, 'assets')
    this.log = path.join(this.dist, 'log.txt')
    this.lib = lib
    this.libs = libs
    this.jks = sign.jks
    if (typeof encoding === 'string') {
      this.encoding = {
        javac: encoding,
        d8: encoding,
        aapt2: encoding
      }
    } else {
      this.encoding = encoding || {
        javac: undefined,
        d8: undefined,
        aapt2: undefined
      }
    }
    this.autoVersion = autoVersion
    this.buildConfig = buildConfig
  }
  setDev() {
    this.isDev = true
    this.isProd = false
    this.init()
  }
  setProd() {
    this.isDev = false
    this.isProd = true
    this.init()
  }
  private init() {
    const mode = process.argv.find(v => v.startsWith('--mode=') || v.startsWith('mode='))?.split('=')[1] || (this.isDev ? 'debug' : 'release')
    this.outpath = path.join(this.dist, mode)
    this.apk = path.join(this.outpath, 'app.apk')
    this.classes = path.join(this.outpath, 'classes')
    this.dex = path.join(this.outpath, 'classes.dex')
    this.jarD8Out = path.join(this.outpath, 'dex-jar')
    this.jarDex = path.join(this.jarD8Out, 'classes.dex')
    this.setMode(mode)
  }
  private setMode(mode: string = "") {
    if (this.buildConfig) {
      const folder = this.buildConfig.package.split('.')
      const envs = this.buildConfig.env[mode] || {}
      envs.mode = mode
      envs.isDev = this.isDev
      envs.isProd = this.isProd
      fs.writeFileSync(path.join(this.src, "java", ...folder, "BuildConfig.java"),
        `package ${this.buildConfig.package};
public class BuildConfig {
${Object.keys(envs).map(k => valueToJava(k, envs[k], 1)).join('\n')}
}`)
    }
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
  getAidlFiles() {
    return this.aidl ? glob.sync('**/*.aidl', {
      cwd: this.aidl
    }).map(p => path.join(this.aidl!, p)) : []
  }
  getJavaFiles() {
    if (this.main) {
      return this.main.map(p => path.join(this.code, p + '.java'))
    }
    return glob.sync('**/*.java', {
      cwd: this.code
    }).map(p => path.join(this.code, p))
  }
  getClassesFiles() {
    return glob.sync('**/*.class', {
      cwd: this.classes
    }).map(p => path.join(this.classes, p))
  }
  getLibFiles() {
    return this.lib ? glob.sync('**/*.jar', {
      cwd: this.lib
    }).map(p => path.join(this.lib!, p)) : []
  }
}

function isWindows() {
  return process.platform === 'win32' || process.env.OSTYPE && /^(msys|cygwin)$/.test(process.env.OSTYPE)
}

export default ApkBuilderConfig