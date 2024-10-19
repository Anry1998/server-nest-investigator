"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.CrudEmployeeService = void 0;
const common_1 = require("@nestjs/common");
const typeorm_1 = require("@nestjs/typeorm");
const typeorm_2 = require("typeorm");
const position_employee_service_1 = require("../position-employee/position-employee.service");
const employee_model_1 = require("./entity/employee.model");
const organ_service_1 = require("../organ/organ.service");
const organ_model_1 = require("../organ/entity/organ.model");
const division_service_1 = require("../division/division.service");
let CrudEmployeeService = class CrudEmployeeService {
    constructor(employeeRepository, organRepository, positionEmployeeService, organService, divisionService) {
        this.employeeRepository = employeeRepository;
        this.organRepository = organRepository;
        this.positionEmployeeService = positionEmployeeService;
        this.organService = organService;
        this.divisionService = divisionService;
    }
    async fetchEmployeeById(id) {
        const queryBuilder = this.employeeRepository
            .createQueryBuilder('employee');
        const found = await queryBuilder
            .where('employee.id = :id', { id })
            .getOne();
        if (!found) {
            throw new common_1.NotFoundException(`Employee "${id}" not found`);
        }
        return found;
    }
    async fetchAllEmployes() {
        const queryBuilder = this.employeeRepository
            .createQueryBuilder('employee');
        const notes = await queryBuilder
            .where('employee.id LIKE :id', { id: 1 })
            .andWhere('note.rating >= :rating', { rating: 4 })
            .orderBy('note.rating', 'DESC')
            .getMany();
        return notes;
    }
    async createEmployee(dto) {
        const organ = await this.organService.getOrganById(dto.organid);
        const division = await this.divisionService.getDivisionById(dto.divisionid);
        let employee = this.employeeRepository.create({ email: dto.email, password: dto.password, organId: organ.id, divisionId: division.id });
        const post = await this.positionEmployeeService.getPositionById(dto.postid);
        let employee2 = {
            ...employee,
            post: [post],
        };
        const user = await this.employeeRepository.save(employee2);
        return user;
    }
    async issueUserPost(employeeId, postId) {
        const post = await this.positionEmployeeService.getPositionById(postId);
        const employee = await this.getEmployeeById(employeeId);
        let a = [...employee.post, post];
        console.log(a);
        const result = await this.employeeRepository.update({ id: employeeId }, { email: 'email8' });
        return employee;
    }
    async getEmployeeByEmail(email) {
        const employee = await this.employeeRepository.findOne({
            where: [{ email: email }]
        });
        if (!employee) {
            console.log('!employee');
        }
        return employee;
    }
    async getEmployeeById(employeeId) {
        console.log('employeeId: ', employeeId);
        try {
            const employee = await this.employeeRepository.findOne({
                where: { id: employeeId },
                relations: ['post'],
            });
            if (!employee) {
                throw new Error('Employee not found');
            }
            return new employee_model_1.SerializationEmployee(employee);
        }
        catch (e) {
            console.log(e);
        }
    }
    async getEmployeeById3(employeeId) {
        try {
            const employee = await this.employeeRepository.findOne({
                where: { id: employeeId },
            });
            if (!employee) {
                throw new Error('Employee not found');
            }
            return employee;
        }
        catch (e) {
            console.log(e);
        }
    }
    async getEmployeeById2(employeeId) {
        const employee = await this.employeeRepository.findOne({
            where: { id: employeeId },
        });
        if (!employee) {
            throw new Error('Employee not found');
        }
        return employee;
    }
};
exports.CrudEmployeeService = CrudEmployeeService;
exports.CrudEmployeeService = CrudEmployeeService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, typeorm_1.InjectRepository)(employee_model_1.Employee)),
    __param(1, (0, typeorm_1.InjectRepository)(organ_model_1.Organ)),
    __metadata("design:paramtypes", [typeorm_2.Repository,
        typeorm_2.Repository,
        position_employee_service_1.PositionEmployeeService,
        organ_service_1.OrganService,
        division_service_1.DivisionService])
], CrudEmployeeService);
//# sourceMappingURL=crud-employee.service.js.map