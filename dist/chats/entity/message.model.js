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
exports.Messagers = void 0;
const typeorm_1 = require("typeorm");
const employee_model_1 = require("../../create-employee/entity/employee.model");
const chat_model_1 = require("./chat.model");
let Messagers = class Messagers {
};
exports.Messagers = Messagers;
__decorate([
    (0, typeorm_1.PrimaryGeneratedColumn)('increment'),
    __metadata("design:type", Number)
], Messagers.prototype, "id", void 0);
__decorate([
    (0, typeorm_1.ManyToOne)(() => chat_model_1.Chat, chat => chat.id),
    (0, typeorm_1.JoinColumn)({ name: 'chatId', referencedColumnName: 'id' }),
    __metadata("design:type", Number)
], Messagers.prototype, "chatId", void 0);
__decorate([
    (0, typeorm_1.ManyToOne)(() => employee_model_1.Employee, employee => employee.id),
    (0, typeorm_1.JoinColumn)({ name: 'employeeId', referencedColumnName: 'id' }),
    __metadata("design:type", Number)
], Messagers.prototype, "employeeId", void 0);
__decorate([
    (0, typeorm_1.Column)(),
    __metadata("design:type", String)
], Messagers.prototype, "message", void 0);
__decorate([
    (0, typeorm_1.Column)({ default: true }),
    __metadata("design:type", Boolean)
], Messagers.prototype, "notRead", void 0);
__decorate([
    (0, typeorm_1.CreateDateColumn)(),
    __metadata("design:type", Date)
], Messagers.prototype, "createTime", void 0);
__decorate([
    (0, typeorm_1.UpdateDateColumn)(),
    __metadata("design:type", Date)
], Messagers.prototype, "updateTime", void 0);
exports.Messagers = Messagers = __decorate([
    (0, typeorm_1.Entity)({ name: 'messagers' })
], Messagers);
//# sourceMappingURL=message.model.js.map