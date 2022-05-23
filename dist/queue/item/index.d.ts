import BaseQueueItem from "./base";
export default function SortQueueItem<T extends BaseQueueItem>(data: T[]): T[];
