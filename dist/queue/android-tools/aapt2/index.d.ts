export declare function compile({ outpath, res }: {
    outpath: string;
    res: string[];
}): import("../../task").default;
export declare function link({ namespace, outpath, rjava, manifest, flat }: {
    outpath: string;
    rjava: string;
    namespace: string;
    manifest: string;
    flat: string[];
}): import("../../task").default;
