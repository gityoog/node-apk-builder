import AdmZip from "adm-zip"
import { FactoryExecTask } from "../../task/factory"
import { existsSync, mkdirSync } from 'fs'
import path from 'path'

export default function d8(fn: () => {
  lib: string
  classpath?: string
  classes?: string
  output: string
  inputs?: string[]
}, encoding?: string) {
  return FactoryExecTask('compile dex', () => {
    const { classpath, output, inputs = [], lib, classes } = fn()
    if (!existsSync(output)) {
      mkdirSync(output, { recursive: true })
    }
    let zip: string | undefined = undefined
    if (classes) {
      const admZip = new AdmZip()
      admZip.addLocalFolder(classes)
      zip = path.resolve(output, 'classes.zip')
      admZip.writeZip(zip)
    }
    return ['d8', `-JDfile.encoding=UTF-8`, `--lib ${lib}`, classpath ? `--classpath ${classpath}` : '', `--output ${output}`, ...inputs,
      ...(zip ? [zip] : [])
    ]
  }, undefined, encoding)
}