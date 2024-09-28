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
exports.PositionEmployeeController = void 0;
const common_1 = require("@nestjs/common");
const position_employee_service_1 = require("./position-employee.service");
const create_position_employee_dto_1 = require("./dto/create-position-employee.dto");
let PositionEmployeeController = class PositionEmployeeController {
    constructor(positionEmployeeService) {
        this.positionEmployeeService = positionEmployeeService;
    }
    create(dto) {
        return this.positionEmployeeService.createPosition(dto);
    }
    getByValue(value) {
        return this.positionEmployeeService.getPositionByValue(value);
    }
    issuePost(data) {
        return this.positionEmployeeService.issueEmployeePost(data.employeeId, data.postId);
    }
    deletePost(data) {
        return this.positionEmployeeService.deleteEmployeePost(data.employeeId, data.postId);
    }
    deleteAllPosts(data) {
        return this.positionEmployeeService.deleteAllEmployeePosts(data.employeeId);
    }
    getAllEmployeePost({ employeeId }) {
        return this.positionEmployeeService.getAllEmployeePosts(employeeId);
    }
    test({ id }) {
        return this.positionEmployeeService.fetchPositionById(id);
    }
};
exports.PositionEmployeeController = PositionEmployeeController;
__decorate([
    (0, common_1.Post)('/create'),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [create_position_employee_dto_1.CreatePositionEmployeeDto]),
    __metadata("design:returntype", void 0)
], PositionEmployeeController.prototype, "create", null);
__decorate([
    (0, common_1.Get)('/:value'),
    __param(0, (0, common_1.Param)('value')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", void 0)
], PositionEmployeeController.prototype, "getByValue", null);
__decorate([
    (0, common_1.Post)('/issue-post'),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", void 0)
], PositionEmployeeController.prototype, "issuePost", null);
__decorate([
    (0, common_1.Post)('/delete-post'),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", void 0)
], PositionEmployeeController.prototype, "deletePost", null);
__decorate([
    (0, common_1.Post)('/delete-all-posts'),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", void 0)
], PositionEmployeeController.prototype, "deleteAllPosts", null);
__decorate([
    (0, common_1.Post)('/get-all-employee-post'),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", void 0)
], PositionEmployeeController.prototype, "getAllEmployeePost", null);
__decorate([
    (0, common_1.Post)('/test-create-query-builder'),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", void 0)
], PositionEmployeeController.prototype, "test", null);
exports.PositionEmployeeController = PositionEmployeeController = __decorate([
    (0, common_1.Controller)('position-employee'),
    __metadata("design:paramtypes", [position_employee_service_1.PositionEmployeeService])
], PositionEmployeeController);
//# sourceMappingURL=position-employee.controller.js.map