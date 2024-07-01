export default function apksigner({ apk, key, cert, jks }: {
    apk: string;
    key?: string;
    cert?: string;
    jks?: {
        path: string;
        alias: string;
        pass: string;
        aliasPass: string;
    };
}): import("../../task").default;
