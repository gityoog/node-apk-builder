import Task from "..";
export declare function FactoryExecTask(name: string, arg: string | string[] | (() => string | string[]), callback?: () => Promise<void>, encoding?: string): Task;
