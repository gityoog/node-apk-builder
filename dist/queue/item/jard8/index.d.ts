import ApkBuilderConfig from "../../../config";
import BaseQueueItem from "../base";
export default class JarD8QueueItem extends BaseQueueItem {
    static create(): JarD8QueueItem;
    task(config: ApkBuilderConfig): import("../../task").default;
}
