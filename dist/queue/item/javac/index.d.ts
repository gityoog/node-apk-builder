import ApkBuilderConfig from "../../../config";
import BaseQueueItem from "../base";
export declare function javac(fn: () => {
    classpath: string;
    output: string;
    inputs: string[];
    source: string;
    lib: string[];
}): import("../../task").default;
export default class JavacQueueItem extends BaseQueueItem {
    static create(): JavacQueueItem;
    task(config: ApkBuilderConfig): import("../../task").default;
}
