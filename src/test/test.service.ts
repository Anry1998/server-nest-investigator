import { Injectable } from '@nestjs/common';
import { EmployeeTest } from './entity/test.model';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { TestEmployeeDto } from './dto/test-employee.dto';

// @Injectable()
// export class TestService {
//     constructor(@InjectRepository(EmployeeTest) private userRepository: Repository<EmployeeTest>){}

//     async createTestEmployee(dto: TestEmployeeDto): Promise<EmployeeTest> {
//         let employee = this.userRepository.create(dto);
//         return await this.userRepository.save(employee);
//     }

//     async getTestEmployeeById(employeeId: number) {
//         try {
//             const employee = await this.userRepository.findOne({
//                 where: {id: employeeId},
//             }) 
//             if (!employee) {
//                 throw new Error('Employee not found')
//             }
//             return employee
//             return new EmployeeTest(employee) 
//         } catch (e) {
//             console.log(e)
//         }
 
//     }
// }
