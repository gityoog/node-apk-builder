export default function NormalRender({ name, index, total, status, stdout, error }: {
    name: string;
    index: number;
    total: number;
    status: number;
    stdout: string[];
    error: string;
}): string;
