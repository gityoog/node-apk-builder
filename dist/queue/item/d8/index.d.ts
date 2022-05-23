import ApkBuilderConfig from "../../../config";
import BaseQueueItem from "../base";
export default class D8QueueItem extends BaseQueueItem {
    static create(): D8QueueItem;
    task(config: ApkBuilderConfig): import("../../task").default;
}
