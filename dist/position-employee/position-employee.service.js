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
exports.PositionEmployeeService = void 0;
const common_1 = require("@nestjs/common");
const typeorm_1 = require("@nestjs/typeorm");
const typeorm_2 = require("typeorm");
const position_employee_model_1 = require("./entity/position-employee.model");
const crud_employee_service_1 = require("../create-employee/crud-employee.service");
const employee_model_1 = require("../create-employee/entity/employee.model");
let PositionEmployeeService = class PositionEmployeeService {
    constructor(crudEmployeeService, positionEmployeeRepository, employeeRepository) {
        this.crudEmployeeService = crudEmployeeService;
        this.positionEmployeeRepository = positionEmployeeRepository;
        this.employeeRepository = employeeRepository;
    }
    async fetchPositionById(id) {
        const queryBuilder = this.positionEmployeeRepository
            .createQueryBuilder('post');
        const found = await queryBuilder
            .where('post.id = :id', { id })
            .getOne();
        if (!found) {
            throw new common_1.NotFoundException(`Post "${id}" not found`);
        }
        return found;
    }
    async createPosition(dto) {
        const role = await this.positionEmployeeRepository.save(dto);
        return role;
    }
    async issueEmployeePost(employeeId, postId) {
        const post = await this.getPositionById(postId);
        if (post.id) {
            const employee = await this.crudEmployeeService.getEmployeeById(employeeId);
            employee.post = [...employee.post, post];
            this.employeeRepository.save(employee);
            return employee;
        }
        throw new common_1.HttpException('Доолжность не найдена', common_1.HttpStatus.NOT_FOUND);
    }
    async deleteEmployeePost(employeeId, postId) {
        const post = await this.getPositionById(postId);
        const employee = await this.crudEmployeeService.getEmployeeById(employeeId);
        employee.post = employee.post.filter(item => item.id !== postId);
        this.employeeRepository.save(employee);
        return employee;
    }
    async deleteAllEmployeePosts(employeeId) {
        const employee = await this.crudEmployeeService.getEmployeeById(employeeId);
        employee.post = [];
        this.employeeRepository.save(employee);
        return employee;
    }
    async getPositionByValue(value) {
        const role = await this.positionEmployeeRepository.findOne({ where: { value } });
        return role;
    }
    async getPositionById(postId) {
        try {
            const post = await this.positionEmployeeRepository.findOne({ where: { id: postId } });
            return post;
        }
        catch (e) {
            return e.message;
        }
    }
    async getAllEmployeePosts(employeeId) {
        const employeePosts = await this.crudEmployeeService.getEmployeeById2(employeeId);
        return employeePosts.post;
    }
};
exports.PositionEmployeeService = PositionEmployeeService;
exports.PositionEmployeeService = PositionEmployeeService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, common_1.Inject)((0, common_1.forwardRef)(() => crud_employee_service_1.CrudEmployeeService))),
    __param(1, (0, typeorm_1.InjectRepository)(position_employee_model_1.PositionEmployee)),
    __param(2, (0, typeorm_1.InjectRepository)(employee_model_1.Employee)),
    __metadata("design:paramtypes", [crud_employee_service_1.CrudEmployeeService,
        typeorm_2.Repository,
        typeorm_2.Repository])
], PositionEmployeeService);
//# sourceMappingURL=position-employee.service.js.map