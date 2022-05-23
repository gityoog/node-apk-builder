import ApkBuilderConfig from "../../../config"
import Task from "../../task"

export default abstract class BaseQueueItem {
  abstract task(config: ApkBuilderConfig): Task
  merge(item: this) {
    return this
  }
}