import { PositionEmployeeService } from './position-employee.service';
import { CreatePositionEmployeeDto } from './dto/create-position-employee.dto';
interface IissuePost {
    employeeId: number;
    postId: number;
}
export declare class PositionEmployeeController {
    private positionEmployeeService;
    constructor(positionEmployeeService: PositionEmployeeService);
    create(dto: CreatePositionEmployeeDto): Promise<CreatePositionEmployeeDto & import("./entity/position-employee.model").PositionEmployee>;
    getByValue(value: string): Promise<import("./entity/position-employee.model").PositionEmployee>;
    issuePost(data: IissuePost): Promise<import("../create-employee/entity/employee.model").Employee>;
    deletePost(data: IissuePost): Promise<import("../create-employee/entity/employee.model").Employee>;
    deleteAllPosts(data: IissuePost): Promise<import("../create-employee/entity/employee.model").Employee>;
    getAllEmployeePost({ employeeId }: any): Promise<import("./entity/position-employee.model").PositionEmployee[]>;
    test({ id }: any): Promise<import("./entity/position-employee.model").PositionEmployee>;
}
export {};
