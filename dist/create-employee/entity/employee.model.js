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
exports.SerializationEmployee = exports.Employee = exports.Rank = void 0;
const token_model_1 = require("../../auth/entity/token.model");
const division_model_1 = require("../../division/entity/division.model");
const incident_model_1 = require("../../incident/entity/incident.model");
const organ_model_1 = require("../../organ/entity/organ.model");
const position_employee_model_1 = require("../../position-employee/entity/position-employee.model");
const typeorm_1 = require("typeorm");
const chat_model_1 = require("../../chats/entity/chat.model");
const message_model_1 = require("../../chats/entity/message.model");
const class_transformer_1 = require("class-transformer");
var Rank;
(function (Rank) {
    Rank["PRIVATE"] = "\u0440\u044F\u0434\u043E\u0432\u043E\u0439";
    Rank["JUNIOR_SERGEANT"] = "\u043C\u043B\u0430\u0434\u0448\u0438\u0439 \u0441\u0435\u0440\u0436\u0430\u043D\u0442";
    Rank["SERGEANT"] = "\u0441\u0435\u0440\u0436\u0430\u043D\u0442";
    Rank["SENIOR_SERGEANT"] = "\u0441\u0442\u0430\u0440\u0448\u0438\u0439 \u0441\u0435\u0440\u0436\u0430\u043D\u0442";
    Rank["ENSIGN"] = "\u043F\u0440\u0430\u043F\u043E\u0440\u0449\u0438\u043A";
    Rank["SECOND_LIEUTENANT"] = "\u043C\u043B\u0430\u0434\u0448\u0438\u0439 \u043B\u0435\u0439\u0442\u0435\u043D\u0430\u043D\u0442";
    Rank["LIEUTENANT"] = "\u043B\u0435\u0439\u0442\u0435\u043D\u0430\u043D\u0442";
    Rank["SENIOR_LIEUTENANT"] = "\u0441\u0442\u0430\u0440\u0448\u0438\u0439 \u043B\u0435\u0439\u0442\u0435\u043D\u0430\u043D\u0442";
    Rank["CAPTAIN"] = "\u043A\u0430\u043F\u0438\u0442\u0430\u043D";
    Rank["MAJOR"] = "\u043C\u0430\u0439\u043E\u0440";
    Rank["LIEUTENANT_COLONEL"] = "\u043F\u043E\u0434\u043F\u043E\u043B\u043A\u043E\u0432\u043D\u0438\u043A";
    Rank["COLONEL"] = "\u043F\u043E\u043B\u043A\u043E\u0432\u043D\u0438\u043A";
    Rank["MAJOR_GENERAL"] = "\u0433\u0435\u043D\u0435\u0440\u0430\u043B-\u043C\u0430\u0439\u043E\u0440";
    Rank["LIEUTENANT_GENERAL"] = "\u0433\u0435\u043D\u0435\u0440\u0430\u043B-\u043B\u0435\u0439\u0442\u0435\u043D\u0430\u043D\u0442";
    Rank["COLONEL_GENERAL"] = "\u0433\u0435\u043D\u0435\u0440\u0430\u043B-\u043F\u043E\u043B\u043A\u043E\u0432\u043D\u0438\u043A";
    Rank["GENERAL"] = "\u0433\u0435\u043D\u0435\u0440\u0430\u043B";
})(Rank || (exports.Rank = Rank = {}));
let Employee = class Employee {
    constructor(partial) {
        Object.assign(this, partial);
    }
};
exports.Employee = Employee;
__decorate([
    (0, typeorm_1.PrimaryGeneratedColumn)('increment'),
    __metadata("design:type", Number)
], Employee.prototype, "id", void 0);
__decorate([
    (0, typeorm_1.Column)(),
    __metadata("design:type", String)
], Employee.prototype, "email", void 0);
__decorate([
    (0, typeorm_1.Column)(),
    __metadata("design:type", String)
], Employee.prototype, "password", void 0);
__decorate([
    (0, typeorm_1.ManyToOne)(() => organ_model_1.Organ, (organ) => organ.employes, {
        cascade: true,
        eager: true,
    }),
    (0, typeorm_1.JoinColumn)({ name: 'organ', referencedColumnName: 'id' }),
    __metadata("design:type", Number)
], Employee.prototype, "organId", void 0);
__decorate([
    (0, typeorm_1.ManyToOne)(() => division_model_1.Division, division => division.employes, {
        cascade: true,
        eager: true,
    }),
    (0, typeorm_1.JoinColumn)({ name: 'division', referencedColumnName: 'id' }),
    __metadata("design:type", Number)
], Employee.prototype, "divisionId", void 0);
__decorate([
    (0, typeorm_1.OneToMany)(() => token_model_1.Token, token => token.employeeId),
    __metadata("design:type", Array)
], Employee.prototype, "token", void 0);
__decorate([
    (0, typeorm_1.CreateDateColumn)(),
    __metadata("design:type", Date)
], Employee.prototype, "createTime", void 0);
__decorate([
    (0, typeorm_1.ManyToMany)(() => position_employee_model_1.PositionEmployee, {
        cascade: true,
        eager: true,
    }),
    (0, typeorm_1.JoinTable)({
        name: "employee_post",
        joinColumn: { name: "employeeId", referencedColumnName: "id" },
        inverseJoinColumn: { name: "postId" }
    }),
    __metadata("design:type", Array)
], Employee.prototype, "post", void 0);
__decorate([
    (0, typeorm_1.ManyToMany)(() => incident_model_1.Incident),
    (0, typeorm_1.JoinTable)({
        name: "employee_incident",
        joinColumn: { name: "employeeId", referencedColumnName: "id" },
        inverseJoinColumn: { name: "postId" }
    }),
    __metadata("design:type", Array)
], Employee.prototype, "incidents", void 0);
__decorate([
    (0, typeorm_1.ManyToMany)(() => chat_model_1.Chat),
    __metadata("design:type", Array)
], Employee.prototype, "chats", void 0);
__decorate([
    (0, typeorm_1.OneToMany)(() => message_model_1.Messagers, messagers => messagers.employeeId),
    __metadata("design:type", Array)
], Employee.prototype, "messagers", void 0);
exports.Employee = Employee = __decorate([
    (0, typeorm_1.Entity)({ name: 'employee' }),
    __metadata("design:paramtypes", [Object])
], Employee);
class SerializationEmployee {
    constructor(partial) {
        Object.assign(this, partial);
    }
}
exports.SerializationEmployee = SerializationEmployee;
__decorate([
    (0, class_transformer_1.Exclude)(),
    __metadata("design:type", String)
], SerializationEmployee.prototype, "password", void 0);
//# sourceMappingURL=employee.model.js.map