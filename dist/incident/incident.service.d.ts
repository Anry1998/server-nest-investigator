import { Repository } from 'typeorm';
import { Incident } from './entity/incident.model';
import { CreateIncidentDto } from './dto/create-incident.dto';
import { OrganService } from '../organ/organ.service';
export declare class IncidentService {
    private incidentRepository;
    private organService;
    constructor(incidentRepository: Repository<Incident>, organService: OrganService);
    createIncident(dto: CreateIncidentDto): Promise<CreateIncidentDto & Incident>;
}
