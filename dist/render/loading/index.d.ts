export default class RenderLoading {
    static symbol: string;
    private value;
    private ref;
    private dots;
    private index;
    private enabled;
    private timer;
    private transform;
    private createTimer;
    private clearTimer;
    private enable;
    private disable;
    setRef(value: string): void;
    private _update?;
    onUpdate(callback: (value: string) => void): void;
    private update;
    destroy(): void;
}
