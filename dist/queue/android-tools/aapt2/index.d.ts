export declare function compile(fn: () => {
    outpath: string;
    res: string[];
}): import("../../task").default;
export declare function link(fn: () => {
    outpath: string;
    rjava: string;
    namespace: string;
    manifest: string;
    flat: string[];
}, encoding?: string): import("../../task").default;
