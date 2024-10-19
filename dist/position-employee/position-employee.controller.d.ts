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
    issuePost(data: IissuePost): Promise<import("../create-employee/entity/employee.model").SerializationEmployee>;
    deletePost(data: IissuePost): Promise<import("../create-employee/entity/employee.model").SerializationEmployee>;
    deleteAllPosts(data: IissuePost): Promise<import("../create-employee/entity/employee.model").SerializationEmployee>;
    getAllEmployeePost({ employeeId }: any): Promise<import("./entity/position-employee.model").PositionEmployee[]>;
    test({ id }: any): Promise<import("./entity/position-employee.model").PositionEmployee>;
}
export {};
