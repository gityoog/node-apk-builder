import Task from "../task";
declare type updateCallback = (data: {
    startTime: number;
    endTime: number;
    tasks: {
        name: string;
        status: {
            type: number;
            data: string[];
            error: string;
            updateTime: number;
        };
    }[];
}) => void;
declare namespace TaskManager {
    type UpdateCallback = updateCallback;
}
declare class TaskManager {
    private logger;
    private data;
    private startTime;
    private endTime;
    run(tasks: Task[]): Promise<void>;
    private start;
    private end;
    private _update?;
    private update;
    onUpdate(callback: updateCallback): void;
    private clear;
    destroy(): void;
}
export default TaskManager;
