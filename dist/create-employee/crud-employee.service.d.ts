import { Repository } from 'typeorm';
import { PositionEmployeeService } from '../position-employee/position-employee.service';
import { Employee, SerializationEmployee } from './entity/employee.model';
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
    createEmployee(dto: CreateEmployeeDto): Promise<Employee>;
    issueUserPost(employeeId: number, postId: number): Promise<SerializationEmployee>;
    getEmployeeByEmail(email: string): Promise<Employee>;
    getEmployeeById(employeeId: number): Promise<SerializationEmployee>;
    getEmployeeById3(employeeId: number): Promise<Employee>;
    getEmployeeById2(employeeId: number): Promise<Employee>;
}
