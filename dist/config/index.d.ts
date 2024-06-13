type options = {
    dist: string;
    src: string;
    androidJar: string;
    render?: boolean;
    buildTools?: string;
    lib?: string[];
    sign: {
        key: string;
        cert: string;
    };
    adb?: {
        main: string;
    };
};
declare namespace ApkBuilderConfig {
    type Options = options;
}
declare class ApkBuilderConfig {
    dist: string;
    src: string;
    key: string;
    cert: string;
    androidJar: string;
    log: string;
    adb?: {
        main: string;
    };
    lib: string[];
    res: string;
    manifest: string;
    code: string;
    assets: string;
    render: boolean;
    outpath: string;
    apk: string;
    classes: string;
    dex: string;
    constructor({ dist, src, buildTools, sign, androidJar, adb, render, lib }: options);
    setMode(mode: string): void;
    getResFiles(): string[];
    getFlatFiles(): string[];
    getJavaFiles(): string[];
    getClassesFiles(): string[];
}
export default ApkBuilderConfig;
