// ----------- Модули nestjs ----------- //
import { ClassSerializerInterceptor, Injectable, NotFoundException, UseInterceptors } from '@nestjs/common';

// ----------- Установленные пакеты  ----------- //
import { InjectRepository } from '@nestjs/typeorm';
import { Repository, SelectQueryBuilder, createQueryBuilder } from 'typeorm';

// ----------- Cервисы других модулей  ----------- //
import { PositionEmployeeService } from '../position-employee/position-employee.service';

// ----------- Схемы  ----------- //
import { Employee, SerializationEmployee } from './entity/employee.model';


// ----------- DTO  ----------- //
import { CreateEmployeeDto } from './dto/create-employee.dto';
import { OrganService } from '../organ/organ.service';
import { Organ } from '../organ/entity/organ.model';
import { DivisionService } from '../division/division.service';


@Injectable()
export class CrudEmployeeService {
    constructor(
        @InjectRepository(Employee) private employeeRepository: Repository<Employee>,
        @InjectRepository(Organ) private organRepository: Repository<Organ>,
        private positionEmployeeService: PositionEmployeeService,
        private organService: OrganService,
        private divisionService: DivisionService,  
    ) {}

    async fetchEmployeeById(id: number): Promise<Employee> {
        const queryBuilder: SelectQueryBuilder<Employee> = this.employeeRepository
            .createQueryBuilder('employee');
    
        const found = await queryBuilder
          .where('employee.id = :id', { id })
          .getOne();
    
        if (!found) {
          throw new NotFoundException(`Employee "${id}" not found`);
        }
    
        return found;
    }

    async fetchAllEmployes(): Promise<Employee[]> {
        const queryBuilder: 
        SelectQueryBuilder<Employee> = this.employeeRepository
        // QueryBuilder for the Note entity, aliasing it as 'note'
        .createQueryBuilder('employee');
        // Build the query with custom conditions
        const notes = await queryBuilder
  
          .where('employee.id LIKE :id', { id: 1 })  // Specify the condition for selecting notes with a title starting with 'Note'
          // condition for selecting notes with a rating greater than or equal 4
          .andWhere('note.rating >= :rating', { rating: 4 }) 
          // Order the results by rating in descending order
          .orderBy('note.rating', 'DESC')
          // Execute the query and retrieve the result
          .getMany();
  
        // Return the array of notes
        return notes;
    }

    async createEmployee(dto: CreateEmployeeDto): Promise<Employee> {
        const organ = await this.organService.getOrganById(dto.organid)
        
        const division = await this.divisionService.getDivisionById(dto.divisionid)
        let employee = this.employeeRepository.create({email: dto.email, password: dto.password, organId: organ.id, divisionId: division.id});
        const post = await this.positionEmployeeService.getPositionById(dto.postid)
        let employee2 = {
            ...employee,
            post: [post] ,
        };
        const user = await this.employeeRepository.save(employee2);
        return user
    }

    
    async issueUserPost(employeeId: number, postId: number) {
        const post = await this.positionEmployeeService.getPositionById(postId)
        const employee = await this.getEmployeeById(employeeId)

        let a = [...employee.post, post] 
        console.log(a)
        // console.log(post)
        // console.log(employee)

        // const result = await this.employeeRepository.update({id: employeeId}, {post: [...a]});

        const result = await this.employeeRepository.update({id: employeeId}, {email: 'email8'});

        return employee

        
    }

    async getEmployeeByEmail(email: string): Promise<Employee> {
        const employee = await this.employeeRepository.findOne({
            where: [{email: email}]
        })
        if (!employee) {
            console.log('!employee')
        }
        
        return employee
    }

    async getEmployeeById(employeeId: number) {
        console.log('employeeId: ', employeeId)
        try {
            const employee = await this.employeeRepository.findOne({
                where: {id: employeeId},
                relations: ['post'], // Загрузите информацию о должностях
            }) 
            if (!employee) {
                throw new Error('Employee not found')
            }
            // return employee
            return new SerializationEmployee(employee) 
        } catch (e) {
            console.log(e)
        }
 
    }

    async getEmployeeById3(employeeId: number) {
        // return `werwerewr`
        try {
            const employee = await this.employeeRepository.findOne({
                where: {id: employeeId},
                // relations: ['post'], // Загрузите информацию о должностях для студента
            })
            if (!employee) {
                throw new Error('Employee not found')
            }
            return employee
        } catch (e) {
            console.log(e)
        }

    }
 
    async getEmployeeById2(employeeId: number) {
        const employee = await this.employeeRepository.findOne({
            where: {id: employeeId},
        })
        if (!employee) {
            throw new Error('Employee not found')
        }
        return employee
    }
}


