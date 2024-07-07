import AlignQueueItem from "./align"
import AppendQueueItem from "./append"
import BaseQueueItem from "./base"
import CleanQueueItem from "./clean"
import D8QueueItem from "./d8"
import InstallQueueItem from "./install"
import JavacQueueItem from "./javac"
import LinkQueueItem from "./link"
import ResQueueItem from "./res"
import AmStartQueueItem from "./am-start"
import SignQueueItem from "./sign"
import AidlQueueItem from "./aidl"

const QueueItems = [CleanQueueItem, ResQueueItem, LinkQueueItem, AidlQueueItem, JavacQueueItem, D8QueueItem, AppendQueueItem, AlignQueueItem, SignQueueItem, InstallQueueItem, AmStartQueueItem]
const Index = new Map<Function, number>()
QueueItems.forEach((item, index) => {
  Index.set(item, index)
})
function getIndex(ins: Object) {
  if (!Index.has(ins.constructor)) {
    throw new Error(`Unknown queue item: ${ins.constructor.name}`)
  }
  return Index.get(ins.constructor)!
}
export default function SortQueueItem<T extends BaseQueueItem>(data: T[]): T[] {
  return data.sort((a, b) => {
    return getIndex(a) - getIndex(b)
  })
}