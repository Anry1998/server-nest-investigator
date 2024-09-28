import { Body, Controller, Post } from '@nestjs/common';
import { OrganService } from './organ.service';
import { CreateOrganDto } from './dto/create-organ.dto';



@Controller('organ')
export class OrganController {
    constructor( 
        private organService: OrganService,
    ) {}

    @Post('/create')
    create (@Body() dto: CreateOrganDto) {
       return this.organService.createOrgan(dto)
    }

    @Post('/test')
    test (@Body() {organId}) {
        // return organId
       return this.organService.getOrganById(organId)
       
    }

}
