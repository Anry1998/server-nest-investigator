import { CreateOrganDto } from './dto/create-organ.dto';
import { Repository } from 'typeorm';
import { Organ } from './entity/organ.model';
export declare class OrganService {
    private organRepository;
    constructor(organRepository: Repository<Organ>);
    createOrgan(dto: CreateOrganDto): Promise<CreateOrganDto & Organ>;
    getOrganById(organId: number): Promise<any>;
}
