export default function apksigner({ apk, key, cert }: {
    apk: string;
    key: string;
    cert: string;
}): import("../../task").default;
