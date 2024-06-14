import { FactoryExecTask } from "../../task/factory"

export function compile(fn: () => {
  outpath: string
  res: string[]
}) {
  return FactoryExecTask('compile resource', () => {
    const { outpath, res } = fn()
    return ["aapt2", "compile", `-o ${outpath}`, ...res]
  })
}

export function link(fn: () => {
  outpath: string
  rjava: string
  namespace: string
  manifest: string
  flat: string[]
}, encoding?: string) {
  return FactoryExecTask('link resource', () => {
    const { outpath, rjava, namespace, manifest, flat } = fn()
    return ["aapt2", "link", `-o ${outpath}`, `--java ${rjava}`, `-I ${namespace}`, `--manifest ${manifest}`, '--auto-add-overlay', ...flat]
  }, undefined, encoding)
}