declare enum Type {
    WAITING = 0,
    RUNNING = 1,
    SUCCESS = 2,
    FAILED = 3,
    CANCELED = 4,
    DESTROY = 5
}
declare type updateData = {
    type: Type;
    data: string[];
    error: string;
};
declare namespace TaskStatus {
    type type = Type;
    type UpdateData = updateData;
}
declare class TaskStatus {
    static Type: typeof Type;
    private type;
    private data;
    private error;
    private updateTime;
    get(): {
        type: number;
        data: string[];
        error: string;
        updateTime: number;
    };
    isRunning(): boolean;
    isWaiting(): boolean;
    private _log?;
    log(value: string): void;
    onLog(callback: (value: string) => void): void;
    run(): void;
    success(): void;
    fail(err: string): void;
    cancel(): void;
    private _update?;
    private update;
    onUpdate(callback: () => void): void;
    destroy(): void;
}
export default TaskStatus;
