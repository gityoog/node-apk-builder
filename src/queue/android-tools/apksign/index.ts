import { FactoryExecTask } from "../../task/factory"

export default function apksigner({ apk, key, cert }: {
  apk: string
  key: string
  cert: string
}) {
  return FactoryExecTask('apksigner', ["apksigner", "sign", `--key ${key}`, `--cert ${cert}`, apk])
}