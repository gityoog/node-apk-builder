import ApkBuilderConfig from "../../../config";
import BaseQueueItem from "../base";
export default class ResQueueItem extends BaseQueueItem {
    static create(): ResQueueItem;
    task(config: ApkBuilderConfig): import("../../task").default;
}
