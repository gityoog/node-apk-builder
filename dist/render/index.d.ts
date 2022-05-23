export default class ApkBuilderRender {
    private manager;
    private loading;
    private config;
    private startTime;
    private endTime;
    private total;
    private data;
    private isDestroyed;
    private init;
    private _update?;
    onUpdate(callback: (value: string) => void): void;
    constructor();
    destroy(): void;
}
