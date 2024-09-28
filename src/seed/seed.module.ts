import { Module } from '@nestjs/common';
import { SeedController } from './seed.controller';
import { SeedService } from './seed.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Organ } from '../organ/entity/organ.model';
import { Division } from '../division/entity/division.model';
import { AuthModule } from '../auth/auth.module';
import { PositionEmployee } from '../position-employee/entity/position-employee.model';
import { Employee } from '../create-employee/entity/employee.model';

@Module({
  controllers: [SeedController],
  providers: [SeedService],
  imports: [
    TypeOrmModule.forFeature([Organ, Division, PositionEmployee, Employee]),
    AuthModule,
  ],
  exports: [
    SeedService,
  ]
})
export class SeedModule {}
