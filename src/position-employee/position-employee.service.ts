import { HttpException, HttpStatus, Inject, Injectable, NotFoundException, forwardRef } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository, SelectQueryBuilder } from 'typeorm';
import { PositionEmployee } from './entity/position-employee.model';
import { CreatePositionEmployeeDto } from './dto/create-position-employee.dto';
import { CrudEmployeeService } from '../create-employee/crud-employee.service';
import { Employee } from '../create-employee/entity/employee.model';


@Injectable()
export class PositionEmployeeService {
    constructor(
        @Inject(forwardRef(() =>  CrudEmployeeService))
        private crudEmployeeService: CrudEmployeeService,
        @InjectRepository(PositionEmployee) private positionEmployeeRepository: Repository<PositionEmployee>,
        @InjectRepository(Employee) private employeeRepository: Repository<Employee>,
    ) {}

    async fetchPositionById(id: number): Promise<PositionEmployee> {
        const queryBuilder:
        SelectQueryBuilder<PositionEmployee> = this.positionEmployeeRepository
        .createQueryBuilder('post');
    
        const found = await queryBuilder
          .where('post.id = :id', { id })
          .getOne();
    
        if (!found) {
          throw new NotFoundException(`Post "${id}" not found`);
        }
    
        return found;
    }

    async createPosition(dto: CreatePositionEmployeeDto) {
        const role = await this.positionEmployeeRepository.save(dto)
        return role
    }

    async issueEmployeePost(employeeId: number, postId: number) {
        const post = await this.getPositionById(postId)
        if (post.id) {
            const employee = await this.crudEmployeeService.getEmployeeById(employeeId)
            employee.post = [...employee.post, post];
            this.employeeRepository.save(employee);
            return employee 
        }
        throw new HttpException('Доолжность не найдена', HttpStatus.NOT_FOUND) 
    }

    async deleteEmployeePost(employeeId: number, postId: number) {
        const post = await this.getPositionById(postId)
        const employee = await this.crudEmployeeService.getEmployeeById(employeeId)
        employee.post = employee.post.filter(item => item.id !==postId)
        this.employeeRepository.save(employee);
        return employee
    }

    async deleteAllEmployeePosts(employeeId: number) {
        const employee = await this.crudEmployeeService.getEmployeeById(employeeId)
        employee.post = []
        this.employeeRepository.save(employee);
        return employee 
    }

    async getPositionByValue(value: string) {
        const role = await this.positionEmployeeRepository.findOne({where: {value}})
        return role
    }

    async getPositionById(postId: number) {
        try { 
            const post = await this.positionEmployeeRepository.findOne({where: {id:postId}})
            return post
        } catch (e) {
            return e.message 
            // throw new HttpException('Доолжность не найдена', HttpStatus.NOT_FOUND)
        }
        
    }

    async getAllEmployeePosts(employeeId: number) {
        const employeePosts = await this.crudEmployeeService.getEmployeeById2(employeeId)
        return employeePosts.post
    }
}


