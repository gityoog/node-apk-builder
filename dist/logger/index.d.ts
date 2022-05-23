import ApkBuilderConfig from "../config";
export default class ApkBuilderLogger {
    config: ApkBuilderConfig;
    private init;
    info(tag: string, value: string): void;
    private _out?;
    bindOut(callback: (value: string) => void): void;
    private update;
    constructor();
    destroy(): void;
}
