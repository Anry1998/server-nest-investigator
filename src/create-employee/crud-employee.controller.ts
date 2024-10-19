import { Body, ClassSerializerInterceptor, Controller, Get, Param, ParseFloatPipe, ParseIntPipe, Post, UseInterceptors } from '@nestjs/common';
import { CrudEmployeeService } from './crud-employee.service';
import { CreateEmployeeDto } from './dto/create-employee.dto';

import { Public } from 'src/auth/decorators/public.decorator';
import { Employee } from './entity/employee.model';

interface IissuePost {
    employeeId: number,
    postId: number
}

@Controller('employee')
export class CrudEmployeeController {
 
    constructor(private crudEmployeeService: CrudEmployeeService) {}

    @Post('/create')
    createEmployee(@Body() employeeDto: CreateEmployeeDto) {
        return this.crudEmployeeService.createEmployee(employeeDto)
    }


    @Post('/issue-post')
    createPost(@Body()  data: IissuePost ) {

        // return data.employeeId
        return this.crudEmployeeService.issueUserPost( data.employeeId, data.postId)
    }

    @UseInterceptors(ClassSerializerInterceptor)
    @Public()
    @Get('/:id')
    getEmployee(@Param('id', new ParseIntPipe) id: number ) {
        // const employee = await this.crudEmployeeService.getEmployeeById(id)
        // if (employee) return new Employee(employee)
        return this.crudEmployeeService.getEmployeeById(id)
    }

    

    @Post('/test-create-query-builder')
    test (@Body() {id}: any) {
      // return id
       return this.crudEmployeeService.fetchEmployeeById(id)
    }

    @Post('/get-employee-test')
    getEmploe (@Body() {id}: any) {
        // return id
       return this.crudEmployeeService.getEmployeeById3(id)
    }

    @Post('/get-employee-by-email')
    getEmploeeByEmail (@Body() {email} ) {
       return this.crudEmployeeService.getEmployeeByEmail(email)
    }

    

}

