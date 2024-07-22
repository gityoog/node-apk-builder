export default function d8(fn: () => {
    lib: string;
    classpath?: string;
    classes?: string;
    output: string;
    inputs?: string[];
}, encoding?: string): import("../../task").default;
