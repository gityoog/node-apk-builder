declare type TaskProcesser = (task: {
    log: (data: string) => void;
    bindAbort: (callback: () => void) => void;
}) => Promise<any>;
export default class Task {
    name: string;
    private status;
    private processer;
    private beforeSuccess?;
    constructor({ processer, callback, name }: {
        name: string;
        processer: TaskProcesser;
        callback?: () => Promise<void>;
    });
    start(): Promise<void>;
    onLog(callback: (data: string) => void): void;
    onUpdate(callback: () => void): void;
    getStatus(): {
        type: number;
        data: string[];
        error: string;
        updateTime: number;
    };
    private _abort?;
    bindAbort(callback: () => void): void;
    destroy(): void;
}
export {};
