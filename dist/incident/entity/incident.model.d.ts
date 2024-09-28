import { Employee } from '../../create-employee/entity/employee.model';
export declare class Incident {
    id: number;
    createTime: Date;
    organId: number;
    employes: Employee[];
}
