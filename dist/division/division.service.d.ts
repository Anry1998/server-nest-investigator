import { Repository } from 'typeorm';
import { Division } from './entity/division.model';
import { CreateDivisionDto } from './dto/division-organ.dto';
export declare class DivisionService {
    private divisionRepository;
    constructor(divisionRepository: Repository<Division>);
    createDivision(dto: CreateDivisionDto): Promise<CreateDivisionDto & Division>;
    getDivisionById(divisionId: number): Promise<any>;
}
