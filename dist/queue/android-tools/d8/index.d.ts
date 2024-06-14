export default function d8(fn: () => {
    classpath: string;
    output: string;
    inputs: string[];
    lib: string[];
}, encoding?: string): import("../../task").default;
