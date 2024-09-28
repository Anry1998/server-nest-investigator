import { Module, forwardRef } from '@nestjs/common';
import { PositionEmployeeController } from './position-employee.controller';
import { PositionEmployeeService } from './position-employee.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { PositionEmployee } from './entity/position-employee.model';
import { CrudEmployeeService } from '../create-employee/crud-employee.service';
import { CrudEmployeeModule } from '../create-employee/crud-employee.module';

import { Employee } from '../create-employee/entity/employee.model';

@Module({
  controllers: [PositionEmployeeController],
  providers: [PositionEmployeeService, ],
  imports: [
    TypeOrmModule.forFeature([PositionEmployee, Employee]),
    forwardRef(() => CrudEmployeeModule)
  ], 
  exports: [
    PositionEmployeeService
  ]
})
export class PositionEmployeeModule {}
