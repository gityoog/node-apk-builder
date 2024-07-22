import ApkBuilderConfig from "../../../config"
import { FactoryExecTask } from "../../task/factory"
import BaseQueueItem from "../base"
import fs from 'fs'
import path from 'path'

export function javac(fn: () => {
  classpath: string
  output: string
  inputs: string[]
  source: string
  lib: string[]
}, encoding?: string) {
  return FactoryExecTask('javac', () => {
    const { classpath, output, inputs, source, lib } = fn()
    const inputsFile = path.resolve(output, 'inputs.txt')
    if (!fs.existsSync(output)) {
      fs.mkdirSync(output, { recursive: true })
    }
    fs.writeFileSync(inputsFile, inputs.join('\n'), { encoding: 'utf-8' })
    // todo 增量编译 
    return ['javac', '-encoding UTF-8 -J-Dfile.encoding=UTF-8', '-source 10 -target 10',
      `-cp ${lib.length > 0 ? '.;' + lib.join(';') + ';' + classpath : classpath}`,
      `-d ${output}`, '@' + inputsFile]
  }, undefined, encoding)
}

export default class JavacQueueItem extends BaseQueueItem {
  static create() {
    return new this
  }
  task(config: ApkBuilderConfig) {
    return javac(() => ({
      classpath: config.main ? [config.androidJar, config.code].join(';') : config.androidJar,
      output: config.classes,
      source: config.code,
      dist: config.outpath,
      inputs: config.getJavaFiles(),
      lib: config.getLibFiles()
    }), config.encoding.javac)
  }
}