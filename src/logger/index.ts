import { Already, Destroy, Inject, Service } from "ioc-di"
import ApkBuilderConfig from "../config"
import fs from 'fs'

@Service()
export default class ApkBuilderLogger {
  @Inject() config!: ApkBuilderConfig

  @Already
  private init() {
    if (this.config.log) {
      if (fs.existsSync(this.config.log)) {
        fs.rmSync(this.config.log)
      }
    }
  }

  info(tag: string, value: string) {
    this.update(`[${new Date().toLocaleString()}]I<${tag}> ${value}`)
  }

  private _out?: (value: string) => void
  bindOut(callback: (value: string) => void) {
    this._out = callback
  }

  private update(value: string) {
    if (this.config.log) {
      fs.appendFileSync(this.config.log, value + '\n')
    }
    this._out?.(value)
  }

  constructor() {
    this.init()
  }

  @Destroy
  destroy() {
    this._out = undefined!
  }
}