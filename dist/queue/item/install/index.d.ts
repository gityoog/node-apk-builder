import ApkBuilderConfig from "../../../config";
import BaseQueueItem from "../base";
export default class InstallQueueItem extends BaseQueueItem {
    static create(): InstallQueueItem;
    task(config: ApkBuilderConfig): import("../../task").default;
}
