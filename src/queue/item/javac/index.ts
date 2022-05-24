import ApkBuilderConfig from "../../../config"
import { FactoryExecTask } from "../../task/factory"
import BaseQueueItem from "../base"

export function javac(fn: () => {
  classpath: string
  output: string
  inputs: string[]
  source: string
}) {
  return FactoryExecTask('javac', () => {
    const { classpath, output, inputs, source } = fn()
    return ['javac', '-encoding UTF-8 -J-Dfile.encoding=UTF-8', '-source 10 -target 10', `-cp ${classpath};${source};${inputs.join(';')}`, `-d ${output}`, ...inputs]
  })
}

export default class JavacQueueItem extends BaseQueueItem {
  static create() {
    return new this
  }
  task(config: ApkBuilderConfig) {
    return javac(() => ({
      classpath: config.androidJar,
      output: config.classes,
      source: config.code,
      inputs: config.getJavaFiles()
    }))
  }
}