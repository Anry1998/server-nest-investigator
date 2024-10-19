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
Object.defineProperty(exports, "__esModule", { value: true });
exports.SocketId = void 0;
const employee_model_1 = require("../../create-employee/entity/employee.model");
const typeorm_1 = require("typeorm");
let SocketId = class SocketId {
};
exports.SocketId = SocketId;
__decorate([
    (0, typeorm_1.PrimaryGeneratedColumn)('increment'),
    __metadata("design:type", Number)
], SocketId.prototype, "id", void 0);
__decorate([
    (0, typeorm_1.Column)(),
    __metadata("design:type", String)
], SocketId.prototype, "socketId", void 0);
__decorate([
    (0, typeorm_1.ManyToOne)(() => employee_model_1.Employee, employee => employee.id),
    (0, typeorm_1.JoinColumn)({ name: 'employeeId', referencedColumnName: 'id' }),
    __metadata("design:type", Number)
], SocketId.prototype, "employeeId", void 0);
exports.SocketId = SocketId = __decorate([
    (0, typeorm_1.Entity)({ name: 'socket' })
], SocketId);
//# sourceMappingURL=socket-id.model.js.map