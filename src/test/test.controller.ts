import { Body, ClassSerializerInterceptor, Controller, Get, HttpException, HttpStatus, Inject, Param, ParseIntPipe, Post, UseInterceptors } from '@nestjs/common';
// import { TestService } from './test.service';
import { TestEmployeeDto } from './dto/test-employee.dto';
import { Public } from 'src/auth/decorators/public.decorator';
import { EmployeeTest, SerializationUser } from './entity/test.model';


@UseInterceptors(ClassSerializerInterceptor)
@Public()
@Controller('test')
export class TestController {
    

    constructor(@Inject('USER_SERVICE') private readonly userService: EmployeeTest) {}

    @Get('')
    getUsers() {
        // return 'Ok'
        return this.userService.getUsers()
    }
 

    
    @Get('/:username')
    getUserByUsername(@Param('username') username: string) {
        // return username
        const user = this.userService.getUserByUsername(username)
        if (user) return new SerializationUser(user)  
        else throw new HttpException('Не нашел', HttpStatus.BAD_REQUEST)
    } 
 


    // constructor(private testService: TestService) {}

    // @Post('create')
    // createTestEmployee(@Body() employeeDto: TestEmployeeDto) {
    //     return this.testService.createTestEmployee(employeeDto)
    // }

    // @Get('/:id')
    // getTestEmployee(@Param('id', new ParseIntPipe) id: number ) {
    //     // const employee = await this.crudEmployeeService.getEmployeeById(id)
    //     // if (employee) return new Employee(employee)
    //     return this.testService.getTestEmployeeById(id)
    // }
}
