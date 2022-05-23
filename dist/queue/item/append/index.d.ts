import BaseQueueItem from "../base";
import ApkBuilderConfig from "../../../config";
import Task from "../../task";
export declare function appendApk({ apk, files, folders }: {
    apk: string;
    files: {
        name?: string;
        path: string;
    }[];
    folders: {
        name?: string;
        path: string;
    }[];
}): Task;
export default class AppendQueueItem extends BaseQueueItem {
    static dex(): AppendQueueItem;
    static assets(): AppendQueueItem;
    private addDex;
    private addAssets;
    task(config: ApkBuilderConfig): Task;
    merge(item: this): this;
}
