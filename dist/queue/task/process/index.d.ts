import Task from "..";
export declare function FactoryProcessTask(name: string, arg: string[][] | (() => string[][]), callback?: () => Promise<void>, encoding?: string): Task;
