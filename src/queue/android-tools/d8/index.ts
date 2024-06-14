import { FactoryExecTask } from "../../task/factory"

export default function d8(fn: () => {
  classpath: string
  output: string
  inputs: string[]
  lib: string[]
}, encoding?: string) {
  return FactoryExecTask('compile dex', () => {
    const { classpath, output, inputs, lib } = fn()
    return ['d8', `-JDfile.encoding=UTF-8 --classpath ${classpath}`, `--output ${output}`, ...inputs, ...lib]
  }, undefined, encoding)
}