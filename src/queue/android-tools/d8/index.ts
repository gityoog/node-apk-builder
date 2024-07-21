import { FactoryExecTask } from "../../task/factory"
import { existsSync, mkdirSync } from 'fs'
export default function d8(fn: () => {
  lib: string
  classpath?: string
  output: string
  inputs: string[]
}, encoding?: string) {
  return FactoryExecTask('compile dex', () => {
    const { classpath, output, inputs, lib } = fn()
    if (!existsSync(output)) {
      mkdirSync(output, { recursive: true })
    }
    return ['d8', `-JDfile.encoding=UTF-8`, `--lib ${lib}`, classpath ? `--classpath ${classpath}` : '', `--output ${output}`, ...inputs]
  }, undefined, encoding)
}