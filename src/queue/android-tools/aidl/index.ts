import { FactoryExecTask } from "../../task/factory"
import { FactoryProcessTask } from "../../task/process"

export default function aidl(fn: () => {
  inputs: string[]
  output: string
  dir: string
}) {
  return FactoryProcessTask('build aidl', () => {
    const { inputs, output, dir } = fn()
    return inputs.map(input => {
      return ['aidl', `-o ${output}`, `-I ${dir}`, input]
    })
  })
}