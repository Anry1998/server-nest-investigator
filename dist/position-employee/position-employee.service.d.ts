import { Repository } from 'typeorm';
import { PositionEmployee } from './entity/position-employee.model';
import { CreatePositionEmployeeDto } from './dto/create-position-employee.dto';
import { CrudEmployeeService } from '../create-employee/crud-employee.service';
import { Employee } from '../create-employee/entity/employee.model';
export declare class PositionEmployeeService {
    private crudEmployeeService;
    private positionEmployeeRepository;
    private employeeRepository;
    constructor(crudEmployeeService: CrudEmployeeService, positionEmployeeRepository: Repository<PositionEmployee>, employeeRepository: Repository<Employee>);
    fetchPositionById(id: number): Promise<PositionEmployee>;
    createPosition(dto: CreatePositionEmployeeDto): Promise<CreatePositionEmployeeDto & PositionEmployee>;
    issueEmployeePost(employeeId: number, postId: number): Promise<import("../create-employee/entity/employee.model").SerializationEmployee>;
    deleteEmployeePost(employeeId: number, postId: number): Promise<import("../create-employee/entity/employee.model").SerializationEmployee>;
    deleteAllEmployeePosts(employeeId: number): Promise<import("../create-employee/entity/employee.model").SerializationEmployee>;
    getPositionByValue(value: string): Promise<PositionEmployee>;
    getPositionById(postId: number): Promise<any>;
    getAllEmployeePosts(employeeId: number): Promise<PositionEmployee[]>;
}
