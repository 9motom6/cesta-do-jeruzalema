export interface Entry {
    name: string;
    amount: number;
    id: string;
    date: Date;
}

export interface CreateEntry {
    name: string;
    amount: number;
}

export interface Walker {
    name: string;
    amount: number;
    longest: number;
}
