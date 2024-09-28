import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { CreateOrganDto } from './dto/create-organ.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Organ } from './entity/organ.model';



@Injectable()
export class OrganService {

    constructor(

        @InjectRepository(Organ) private organRepository: Repository<Organ>,

    ) {}

    async createOrgan(dto: CreateOrganDto) {
        const organ = await this.organRepository.findOne({
            where: [{name: dto.name}]
        })
        if (organ) {
            throw new HttpException(`Орган: ${dto.name} уже существует`, HttpStatus.BAD_REQUEST) 
        }
        return await this.organRepository.save(dto)  
    }

    async getOrganById(organId: number) {
        try {  
            const organ = await this.organRepository.findOne({where: {id:organId}})
            return organ
        } catch (e) {
            return e.message 
        } 
    }
}
