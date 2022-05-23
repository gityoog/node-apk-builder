import ApkBuilderConfig from "../../../config";
import BaseQueueItem from "../base";
import Task from "../../task";
export declare function cleanOutpath({ outpath }: {
    outpath: string;
}): Task;
export default class CleanQueueItem extends BaseQueueItem {
    static create(): CleanQueueItem;
    task(config: ApkBuilderConfig): Task;
}
