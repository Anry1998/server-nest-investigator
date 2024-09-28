import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Incident } from './entity/incident.model';
import { CreateIncidentDto } from './dto/create-incident.dto';
import { OrganService } from '../organ/organ.service';

OrganService

@Injectable()
export class IncidentService {
    constructor(
        @InjectRepository(Incident) private incidentRepository: Repository<Incident>,
        private organService: OrganService,
    ) {}
 
    async createIncident(dto: CreateIncidentDto) {
        const incident = this.incidentRepository.save(dto)
        return incident 
        // const organ = await this.organService.getOrganById(dto.organId)
        // console.log(organ)
        // return organ
        // const role =  this.incidentRepository.save()
        // console.log(role)
        // return role
    }
}
