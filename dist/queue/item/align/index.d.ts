import ApkBuilderConfig from "../../../config";
import BaseQueueItem from "../base";
export default class AlignQueueItem extends BaseQueueItem {
    static create(): AlignQueueItem;
    task(config: ApkBuilderConfig): import("../../task").default;
}
