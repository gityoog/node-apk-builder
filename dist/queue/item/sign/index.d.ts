import ApkBuilderConfig from "../../../config";
import BaseQueueItem from "../base";
export default class SignQueueItem extends BaseQueueItem {
    static create(): SignQueueItem;
    task(config: ApkBuilderConfig): import("../../task").default;
}
