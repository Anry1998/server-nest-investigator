import { Body, Controller, Get, Post } from '@nestjs/common';
import { CreateIncidentDto } from './dto/create-incident.dto';
import { IncidentService } from './incident.service';

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

    @Get('/test')
    async test() {
        return "erererer"
    }
}
