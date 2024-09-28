import { Employee } from '../../create-employee/entity/employee.model';
export declare class Division {
    id: number;
    name: string;
    createTime: Date;
    organId: number;
    employes: Employee[];
}
