export interface User {
    username: string;
    password: string;
}
export declare class EmployeeTest {
    private users;
    getUsers(): SerializationUser[];
    getUserByUsername(username: string): User;
}
export declare class SerializationUser {
    username: string;
    password: string;
    constructor(partial: Partial<SerializationUser>);
}
