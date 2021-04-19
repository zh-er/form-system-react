export interface User {
    id: string; // uuid
    username: string;
    email: string;
    role: UserRole;
}

export enum UserRole {
    ADMIN,
    USER
}
