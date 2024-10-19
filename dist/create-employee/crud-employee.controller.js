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
exports.CrudEmployeeController = void 0;
const common_1 = require("@nestjs/common");
const crud_employee_service_1 = require("./crud-employee.service");
const create_employee_dto_1 = require("./dto/create-employee.dto");
const public_decorator_1 = require("../auth/decorators/public.decorator");
let CrudEmployeeController = class CrudEmployeeController {
    constructor(crudEmployeeService) {
        this.crudEmployeeService = crudEmployeeService;
    }
    createEmployee(employeeDto) {
        return this.crudEmployeeService.createEmployee(employeeDto);
    }
    createPost(data) {
        return this.crudEmployeeService.issueUserPost(data.employeeId, data.postId);
    }
    getEmployee(id) {
        return this.crudEmployeeService.getEmployeeById(id);
    }
    test({ id }) {
        return this.crudEmployeeService.fetchEmployeeById(id);
    }
    getEmploe({ id }) {
        return this.crudEmployeeService.getEmployeeById3(id);
    }
    getEmploeeByEmail({ email }) {
        return this.crudEmployeeService.getEmployeeByEmail(email);
    }
};
exports.CrudEmployeeController = CrudEmployeeController;
__decorate([
    (0, common_1.Post)('/create'),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [create_employee_dto_1.CreateEmployeeDto]),
    __metadata("design:returntype", void 0)
], CrudEmployeeController.prototype, "createEmployee", null);
__decorate([
    (0, common_1.Post)('/issue-post'),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", void 0)
], CrudEmployeeController.prototype, "createPost", null);
__decorate([
    (0, common_1.UseInterceptors)(common_1.ClassSerializerInterceptor),
    (0, public_decorator_1.Public)(),
    (0, common_1.Get)('/:id'),
    __param(0, (0, common_1.Param)('id', new common_1.ParseIntPipe)),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number]),
    __metadata("design:returntype", void 0)
], CrudEmployeeController.prototype, "getEmployee", null);
__decorate([
    (0, common_1.Post)('/test-create-query-builder'),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", void 0)
], CrudEmployeeController.prototype, "test", null);
__decorate([
    (0, common_1.Post)('/get-employee-test'),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", void 0)
], CrudEmployeeController.prototype, "getEmploe", null);
__decorate([
    (0, common_1.Post)('/get-employee-by-email'),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", void 0)
], CrudEmployeeController.prototype, "getEmploeeByEmail", null);
exports.CrudEmployeeController = CrudEmployeeController = __decorate([
    (0, common_1.Controller)('employee'),
    __metadata("design:paramtypes", [crud_employee_service_1.CrudEmployeeService])
], CrudEmployeeController);
//# sourceMappingURL=crud-employee.controller.js.map