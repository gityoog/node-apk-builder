type options = {
    dist: string;
    src: string;
    androidJar: string;
    render?: boolean;
    buildTools?: string;
    lib?: string;
    libs?: string;
    aidl?: string;
    encoding?: {
        javac?: string;
        d8?: string;
        aapt2?: string;
    } | string;
    sign: {
        key: string;
        cert: string;
        jks?: {
            path: string;
            alias: string;
            pass: string;
            aliasPass: string;
        };
    };
    resources?: string[];
    adb?: {
        install?: boolean;
        main?: string;
        service?: string;
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
    adb: {
        install?: boolean | undefined;
        main?: string | undefined;
        service?: string | undefined;
    } | undefined;
    res: string;
    manifest: string;
    code: string;
    assets: string;
    render: boolean;
    outpath: string;
    apk: string;
    classes: string;
    dex: string;
    resources: string[];
    private lib;
    libs: string | undefined;
    encoding: {
        javac?: string | undefined;
        d8?: string | undefined;
        aapt2?: string | undefined;
    };
    jks: {
        path: string;
        alias: string;
        pass: string;
        aliasPass: string;
    } | undefined;
    aidl: string | undefined;
    constructor({ dist, src, buildTools, sign, androidJar, adb, render, lib, libs, encoding, resources, aidl }: options);
    setMode(mode: string): void;
    getResFiles(): string[];
    getFlatFiles(): string[];
    getAidlFiles(): string[];
    getJavaFiles(): string[];
    getClassesFiles(): string[];
    getLibFiles(): string[];
}
export default ApkBuilderConfig;
