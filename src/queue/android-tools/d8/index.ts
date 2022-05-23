import { FactoryExecTask } from "../../task/factory"

export default function d8({ classpath, output, inputs }: {
  classpath: string
  output: string
  inputs: string[]
}) {
  return FactoryExecTask('compile dex', ['d8', `--classpath ${classpath}`, `--output ${output}`, ...inputs])
}