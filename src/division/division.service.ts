import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Division } from './entity/division.model';
import { CreateDivisionDto } from './dto/division-organ.dto';

Division

@Injectable()
export class DivisionService {
 
    constructor(
        @InjectRepository(Division) private divisionRepository: Repository<Division>,
    ) {}

    async createDivision(dto: CreateDivisionDto) {
        const division = await this.divisionRepository.findOne({
            where: [{name: dto.name}]
        })
        if (division) {
            throw new HttpException(`Подразделение: ${dto.name} уже существует`, HttpStatus.BAD_REQUEST) 
        }
        return await this.divisionRepository.save(dto)  
    }

    async getDivisionById(divisionId: number) {
        try {  
            const division = await this.divisionRepository.findOne({where: {id:divisionId}})
            console.log(division)
            return division
        } catch (e) {
            return e.message 
        } 
    }
}
