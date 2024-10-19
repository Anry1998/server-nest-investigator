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
exports.Chat = void 0;
const employee_model_1 = require("../../create-employee/entity/employee.model");
const typeorm_1 = require("typeorm");
const message_model_1 = require("./message.model");
let Chat = class Chat {
};
exports.Chat = Chat;
__decorate([
    (0, typeorm_1.PrimaryGeneratedColumn)('increment'),
    __metadata("design:type", Number)
], Chat.prototype, "id", void 0);
__decorate([
    (0, typeorm_1.Column)(),
    __metadata("design:type", String)
], Chat.prototype, "title", void 0);
__decorate([
    (0, typeorm_1.ManyToMany)(() => employee_model_1.Employee, {
        cascade: true,
        eager: true,
    }),
    (0, typeorm_1.JoinTable)({
        name: "employes_chats",
        joinColumn: { name: "chatId", referencedColumnName: "id" },
        inverseJoinColumn: { name: "employeeId" }
    }),
    __metadata("design:type", Array)
], Chat.prototype, "employes", void 0);
__decorate([
    (0, typeorm_1.OneToMany)(() => message_model_1.Messagers, messagers => messagers.chatId),
    __metadata("design:type", Array)
], Chat.prototype, "messagers", void 0);
__decorate([
    (0, typeorm_1.CreateDateColumn)(),
    __metadata("design:type", Date)
], Chat.prototype, "createTime", void 0);
exports.Chat = Chat = __decorate([
    (0, typeorm_1.Entity)({ name: 'chat' })
], Chat);
//# sourceMappingURL=chat.model.js.map