import { Body, Controller, Get, Post, UseGuards } from '@nestjs/common';
import { CreateIncidentDto } from './dto/create-incident.dto';
import { IncidentService } from './incident.service';
import { AccessTokenGuard } from 'src/auth/guard/access-token.guard';
import { RoleGuard } from 'src/auth/guard/authorization.guard';
import { Role } from 'src/auth/decorators/role';
import { Public } from 'src/auth/decorators/public.decorator';



// @Role( '2', '3')
// @UseGuards(AccessTokenGuard, RoleGuard)
// @UseGuards(AccessTokenGuard)
@Controller('incident')
export class IncidentController {
    constructor(
        private incidentService: IncidentService,
    ) {}

    @Post('/create')
    async createIncident(@Body() dto: CreateIncidentDto) {
        const incident = await this.incidentService.createIncident(dto)
        return incident
    }

    
    @Public()
    // @UseGuards(AccessTokenGuard)
    @Get('/test')
    async test() {
        return "erererer"
    }

    
    @Get('/test2')
    async test2() {
        return "erererer"
    }
}
