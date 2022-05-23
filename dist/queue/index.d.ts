export default class ApkBuilderQueue {
    private map;
    private lock;
    buildSource(): void;
    buildManifest(): void;
    buildRes(): void;
    buildAssets(): void;
    all(): Promise<void>;
    private push;
    private tasks;
    private config;
    private next;
    destroy(): void;
}
