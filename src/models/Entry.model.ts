export interface Entry {
    id?: string, // uuid
    updatedAt: Date,
    username?: string,
    status?: EntryStatus,
    content: string
}

export enum EntryStatus {
    PENDING,
    ACCEPTED,
    APPROVED,
    REJECTED,
}
