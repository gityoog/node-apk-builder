import ApkBuilderConfig from "../../../config";
import BaseQueueItem from "../base";
export default class AidlQueueItem extends BaseQueueItem {
    static create(): AidlQueueItem;
    task(config: ApkBuilderConfig): import("../../task").default;
}
