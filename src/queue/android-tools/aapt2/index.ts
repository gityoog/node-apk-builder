import { FactoryExecTask } from "../../task/factory"

export function compile({ outpath, res }: {
  outpath: string
  res: string[]
}) {
  return FactoryExecTask('compile resource', ["aapt2", "compile", `-o ${outpath}`, ...res])
}

export function link({ namespace, outpath, rjava, manifest, flat }: {
  outpath: string
  rjava: string
  namespace: string
  manifest: string
  flat: string[]
}) {
  return FactoryExecTask('link resource', ["aapt2", "link", `-o ${outpath}`, `--java ${rjava}`, `-I ${namespace}`, `--manifest ${manifest}`, '--auto-add-overlay', ...flat])
}