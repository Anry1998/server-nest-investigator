import { DivisionService } from './division.service';
import { CreateDivisionDto } from './dto/division-organ.dto';
export declare class DivisionController {
    private divisionService;
    constructor(divisionService: DivisionService);
    create(dto: CreateDivisionDto): Promise<CreateDivisionDto & import("./entity/division.model").Division>;
}
