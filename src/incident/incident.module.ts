import { Module } from '@nestjs/common';
import { IncidentController } from './incident.controller';
import { IncidentService } from './incident.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Incident } from './entity/incident.model';
import { OrganModule } from '../organ/organ.module';


@Module({
  controllers: [IncidentController],
  providers: [IncidentService],
  imports: [
    TypeOrmModule.forFeature([Incident]),
    OrganModule,
  ],
  exports: [
    IncidentService
  ]
})
export class IncidentModule {}
