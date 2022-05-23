import ApkBuilderConfig from "./config";
import TaskManager from "./queue/task-manager";
export default class ApkBuilder {
    static Create(...args: ConstructorParameters<typeof ApkBuilder>): ApkBuilder;
    private queue;
    private config;
    private logger;
    private render;
    private manager;
    /** @deprecated Please use ApkBuilder.Create */
    constructor(options: ApkBuilderConfig.Options);
    build(): Promise<void>;
    private watchpack?;
    watch(): void;
    onLog(callback: (value: string) => void): void;
    setRender(callback: (value: string) => void): void;
    setUpdater(callback: TaskManager.UpdateCallback): void;
    destroy(): void;
}
