import { EmployeeTest, SerializationUser } from './entity/test.model';
export declare class TestController {
    private readonly userService;
    constructor(userService: EmployeeTest);
    getUsers(): SerializationUser[];
    getUserByUsername(username: string): SerializationUser;
}
