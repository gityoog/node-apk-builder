export default function aidl(fn: () => {
    inputs: string[];
    output: string;
    dir: string;
}): import("../../task").default;
