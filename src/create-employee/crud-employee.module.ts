import { Module, forwardRef } from '@nestjs/common';
import { CrudEmployeeController } from './crud-employee.controller';
import { CrudEmployeeService } from './crud-employee.service';

import { TypeOrmModule } from '@nestjs/typeorm';
import { Employee } from './entity/employee.model';
import { PositionEmployeeService } from 'src/position-employee/position-employee.service';
import { PositionEmployeeModule } from '../position-employee/position-employee.module';
import { PositionEmployee } from '../position-employee/entity/position-employee.model';
import { OrganModule } from '../organ/organ.module';

import { Organ } from '../organ/entity/organ.model';
import { DivisionModule } from '../division/division.module';





@Module({
  controllers: [CrudEmployeeController],
  providers: [CrudEmployeeService,],
  imports: [
    TypeOrmModule.forFeature([Employee, PositionEmployee, Organ]), 
    forwardRef(() => PositionEmployeeModule), 
    OrganModule,
    DivisionModule
  ],
  exports: [
    CrudEmployeeService
  ]
})
export class CrudEmployeeModule {}
