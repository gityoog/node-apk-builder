import BaseQueueItem from "../base";
import ApkBuilderConfig from "../../../config";
export default class LinkQueueItem extends BaseQueueItem {
    static create(): LinkQueueItem;
    task(config: ApkBuilderConfig): import("../../task").default;
}
