import { Repository } from 'typeorm';
import { PositionEmployeeService } from '../position-employee/position-employee.service';
import { Employee } from './entity/employee.model';
import { CreateEmployeeDto } from './dto/create-employee.dto';
import { OrganService } from '../organ/organ.service';
import { Organ } from '../organ/entity/organ.model';
import { DivisionService } from '../division/division.service';
export declare class CrudEmployeeService {
    private employeeRepository;
    private organRepository;
    private positionEmployeeService;
    private organService;
    private divisionService;
    constructor(employeeRepository: Repository<Employee>, organRepository: Repository<Organ>, positionEmployeeService: PositionEmployeeService, organService: OrganService, divisionService: DivisionService);
    fetchEmployeeById(id: number): Promise<Employee>;
    fetchAllEmployes(): Promise<Employee[]>;
    createEmployee(dto: CreateEmployeeDto): Promise<{
        post: any[];
        id: number;
        email: string;
        password: string;
        organId: number;
        divisionId: number;
        token: import("../auth/entity/token.model").Token[];
        createTime: Date;
        incidents: import("../incident/entity/incident.model").Incident[];
    } & Employee>;
    issueUserPost(employeeId: number, postId: number): Promise<Employee>;
    getEmployeeByEmail(email: string): Promise<Employee>;
    getEmployeeById(employeeId: number): Promise<Employee>;
    getEmployeeById3(employeeId: number): Promise<Employee>;
    getEmployeeById2(employeeId: number): Promise<Employee>;
}
