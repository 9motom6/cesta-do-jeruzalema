export interface Entry {
    name: string;
    amount: number;
    id: string;
    _ts: number;
}

export interface CreateEntry {
    name: string;
    amount: number;
}
