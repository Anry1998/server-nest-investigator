import { Controller, Get } from '@nestjs/common';
import { SeedService } from './seed.service';

import { Public } from 'src/auth/decorators/public.decorator';



@Controller('seed')
export class SeedController {
    constructor(
        private readonly seedService: SeedService,
    ) {}
 

    @Get('fill-organ')
    async  seedDataOrgan(): Promise<string> {
        await this.seedService.seedDataOrgan();
        return 'Таблица organ успешно заполнена!';
    }

    @Get('fill-division')
    async  seedDataDivision(): Promise<string> {
        await this.seedService.seedDataDivision();
        return 'Таблица division успешно заполнена!';
    } 

    @Get('fill-position-employee')
    async  seedDataPositionEmployee(): Promise<string> {
        await this.seedService.seedDataPositionEmployee();
        return 'Таблица position-employee успешно заполнена!';
    }

    @Get('fill-organ-division-post') 
    async  seedOrganDivisionPost() {
        await this.seedService.allOrganDivisionPost(); 
    }

    @Get('create-employes')
    async  seedDataCreateExampleEmployes(): Promise<string> {
        return await this.seedService.createExampleEmployes(); 
    }

    @Public()
    @Get('all-seed')
    async  seedDataAll(): Promise<string> {
        return await this.seedService.allSeed()
    }
 
    @Public()
    @Get('all-seed-test')
    async  seedDataAllTest(): Promise<string> {
        return `all-seed-test`
    }
} 
