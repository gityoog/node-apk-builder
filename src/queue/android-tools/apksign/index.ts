import { FactoryExecTask } from "../../task/factory"

export default function apksigner({ apk, key, cert, jks }: {
  apk: string
  key?: string
  cert?: string
  jks?: {
    path: string
    alias: string
    pass: string
    aliasPass: string
  }
}) {
  if (jks) {
    return FactoryExecTask('apksigner', ["apksigner", "-JDfile.encoding=UTF-8 sign", `--ks ${jks.path}`, `--ks-key-alias ${jks.alias}`, `--ks-pass pass:${jks.pass}`, `--key-pass pass:${jks.aliasPass}`, apk])
  }
  return FactoryExecTask('apksigner', ["apksigner", "-JDfile.encoding=UTF-8 sign", `--key ${key}`, `--cert ${cert}`, apk])
}