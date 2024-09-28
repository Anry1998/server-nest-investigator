import { Document } from '../../document/entity/document.model';
import { Employee } from '../../create-employee/entity/employee.model';
import { Division } from '../../division/entity/division.model';
import { Incident } from '../../incident/entity/incident.model';
export declare class Organ {
    id: number;
    name: string;
    adress: string;
    createTime: Date;
    employes: Employee[];
    divisions: Division[];
    incidents: Incident[];
    documents: Document[];
}
