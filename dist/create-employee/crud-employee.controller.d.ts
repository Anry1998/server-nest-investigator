import { CrudEmployeeService } from './crud-employee.service';
import { CreateEmployeeDto } from './dto/create-employee.dto';
interface IissuePost {
    employeeId: number;
    postId: number;
}
export declare class CrudEmployeeController {
    private crudEmployeeService;
    constructor(crudEmployeeService: CrudEmployeeService);
    createEmployee(employeeDto: CreateEmployeeDto): Promise<{
        post: any[];
        id: number;
        email: string;
        password: string;
        organId: number;
        divisionId: number;
        token: import("../auth/entity/token.model").Token[];
        createTime: Date;
        incidents: import("../incident/entity/incident.model").Incident[];
    } & import("./entity/employee.model").Employee>;
    createPost(data: IissuePost): Promise<import("./entity/employee.model").Employee>;
    test({ id }: any): Promise<import("./entity/employee.model").Employee>;
    getEmploe({ id }: any): Promise<import("./entity/employee.model").Employee>;
    getEmploeeByEmail({ email }: {
        email: any;
    }): Promise<import("./entity/employee.model").Employee>;
}
export {};
