import { CreateIncidentDto } from './dto/create-incident.dto';
import { IncidentService } from './incident.service';
export declare class IncidentController {
    private incidentService;
    constructor(incidentService: IncidentService);
    createIncident(dto: CreateIncidentDto): Promise<CreateIncidentDto & import("./entity/incident.model").Incident>;
    test(): Promise<string>;
    test2(): Promise<string>;
}
