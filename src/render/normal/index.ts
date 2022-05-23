import logSymbols from "log-symbols"
import TaskStatus from "../../queue/task/status"
import cliTruncate from 'cli-truncate'
import RenderLoading from '../loading'
import chalk from "chalk"

const StatusIcon: Record<any, string> = {
  [TaskStatus.Type.SUCCESS]: logSymbols.success,
  [TaskStatus.Type.FAILED]: logSymbols.error,
  [TaskStatus.Type.WAITING]: " ",
  [TaskStatus.Type.RUNNING]: RenderLoading.symbol,
  default: logSymbols.warning
}
export default function NormalRender({ name, index, total, status, stdout, error }: {
  name: string
  index: number
  total: number
  status: number
  stdout: string[]
  error: string
}) {
  const column = process.stdout.columns
  const icon = StatusIcon[status] || StatusIcon.default
  const content =
    status === TaskStatus.Type.FAILED ? cliTruncate(error, Math.min(column, 200)) :
      status === TaskStatus.Type.RUNNING ? stdout.slice(-4).join('\n').split('\n').slice(-4).map(item => cliTruncate(item, Math.min(column, 200))).join('\n') :
        ""
  const header = `${icon} [${index + 1}/${total}] ${name}`
  return `${setColor(header, status)}${content ? "\n" + indent(chalk.gray(content)) : ""}`
}

function indent(content: string, level: number = 1) {
  return content.split('\n').map(line => "  ".repeat(level) + line).join('\n')
}

function setColor(text: string, status: number) {
  const fn = ({
    [TaskStatus.Type.SUCCESS]: chalk.green,
    [TaskStatus.Type.FAILED]: chalk.red,
    [TaskStatus.Type.RUNNING]: chalk.yellow,
  })[status] || chalk.white
  return fn.call(chalk, text)
}