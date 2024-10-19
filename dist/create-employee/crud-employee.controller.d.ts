import { CrudEmployeeService } from './crud-employee.service';
import { CreateEmployeeDto } from './dto/create-employee.dto';
import { Employee } from './entity/employee.model';
interface IissuePost {
    employeeId: number;
    postId: number;
}
export declare class CrudEmployeeController {
    private crudEmployeeService;
    constructor(crudEmployeeService: CrudEmployeeService);
    createEmployee(employeeDto: CreateEmployeeDto): Promise<Employee>;
    createPost(data: IissuePost): Promise<import("./entity/employee.model").SerializationEmployee>;
    getEmployee(id: number): Promise<import("./entity/employee.model").SerializationEmployee>;
    test({ id }: any): Promise<Employee>;
    getEmploe({ id }: any): Promise<Employee>;
    getEmploeeByEmail({ email }: {
        email: any;
    }): Promise<Employee>;
}
export {};
