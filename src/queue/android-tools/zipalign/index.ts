import fs from "fs"
import { FactoryExecTask } from "../../task/factory"

export default function zipalign({ apk }: { apk: string }) {
  return FactoryExecTask('zipalign', ["zipalign", "-p", "-f", "4", apk, apk + ".aligned"], async () => {
    fs.unlinkSync(apk)
    fs.renameSync(apk + ".aligned", apk)
  })
}