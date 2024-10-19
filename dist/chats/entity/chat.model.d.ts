import { Employee } from '../../create-employee/entity/employee.model';
import { Messagers } from './message.model';
export declare class Chat {
    id: number;
    title: string;
    employes: Employee[];
    messagers: Messagers[];
    createTime: Date;
}
