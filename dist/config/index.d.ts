type options = {
    dist: string;
    src: string;
    androidJar: string;
    render?: boolean;
    buildTools?: string;
    lib?: string;
    libs?: string;
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
    res: string;
    manifest: string;
    code: string;
    assets: string;
    render: boolean;
    outpath: string;
    apk: string;
    classes: string;
    dex: string;
    private lib;
    libs: string | undefined;
    constructor({ dist, src, buildTools, sign, androidJar, adb, render, lib, libs }: options);
    setMode(mode: string): void;
    getResFiles(): string[];
    getFlatFiles(): string[];
    getJavaFiles(): string[];
    getClassesFiles(): string[];
    getLibFiles(): string[];
}
export default ApkBuilderConfig;
