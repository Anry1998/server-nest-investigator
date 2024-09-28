import { Body, Controller, Post } from '@nestjs/common';
import { DivisionService } from './division.service';
import { CreateDivisionDto } from './dto/division-organ.dto';

@Controller('division')
export class DivisionController {
    constructor( 
        private divisionService: DivisionService,
    ) {}

    @Post('/create')
    create (@Body() dto: CreateDivisionDto) {
       return this.divisionService.createDivision(dto)
    }
}
