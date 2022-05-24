import { FactoryExecTask } from "../../task/factory"

export default function apksigner({ apk, key, cert }: {
  apk: string
  key: string
  cert: string
}) {
  return FactoryExecTask('apksigner', ["apksigner", "-JDfile.encoding=UTF-8 sign", `--key ${key}`, `--cert ${cert}`, apk])
}