import ApkBuilderConfig from "../../../config";
import BaseQueueItem from "../base";
export default class AmStartQueueItem extends BaseQueueItem {
    static create(): AmStartQueueItem;
    task(config: ApkBuilderConfig): import("../../task").default;
}
