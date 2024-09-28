import { Body, Controller, Get, Param, Post } from '@nestjs/common';
import { PositionEmployeeService } from './position-employee.service';
import { CreatePositionEmployeeDto } from './dto/create-position-employee.dto';
import { CrudEmployeeService } from '../create-employee/crud-employee.service';

interface IissuePost {
  employeeId: number,
  postId: number
}

@Controller('position-employee')
export class PositionEmployeeController {
    constructor( 
        private positionEmployeeService: PositionEmployeeService,
    ) {}

    @Post('/create')
    create (@Body() dto: CreatePositionEmployeeDto) {
       return this.positionEmployeeService.createPosition(dto)
    }

    @Get('/:value')
    getByValue(@Param('value') value: string){
      return this.positionEmployeeService.getPositionByValue(value)
    }

    @Post('/issue-post')
    issuePost(@Body()  data: IissuePost ) {
      return this.positionEmployeeService.issueEmployeePost( data.employeeId,data.postId )
    }

    @Post('/delete-post')
    deletePost(@Body()  data: IissuePost ) {
      return this.positionEmployeeService.deleteEmployeePost( data.employeeId, data.postId)
    }

    @Post('/delete-all-posts')
    deleteAllPosts(@Body()  data: IissuePost ) {
      return this.positionEmployeeService.deleteAllEmployeePosts( data.employeeId)
    }

    @Post('/get-all-employee-post')
    getAllEmployeePost(@Body() {employeeId}: any ) {
      return this.positionEmployeeService.getAllEmployeePosts(employeeId)
    }

    @Post('/test-create-query-builder')
    test (@Body() {id}: any) {
      return this.positionEmployeeService.fetchPositionById(id)
    }
}
