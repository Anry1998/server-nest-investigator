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
exports.Organ = void 0;
const document_model_1 = require("../../document/entity/document.model");
const employee_model_1 = require("../../create-employee/entity/employee.model");
const division_model_1 = require("../../division/entity/division.model");
const incident_model_1 = require("../../incident/entity/incident.model");
const typeorm_1 = require("typeorm");
let Organ = class Organ {
};
exports.Organ = Organ;
__decorate([
    (0, typeorm_1.PrimaryGeneratedColumn)('increment'),
    __metadata("design:type", Number)
], Organ.prototype, "id", void 0);
__decorate([
    (0, typeorm_1.Column)(),
    __metadata("design:type", String)
], Organ.prototype, "name", void 0);
__decorate([
    (0, typeorm_1.Column)(),
    __metadata("design:type", String)
], Organ.prototype, "adress", void 0);
__decorate([
    (0, typeorm_1.CreateDateColumn)(),
    __metadata("design:type", Date)
], Organ.prototype, "createTime", void 0);
__decorate([
    (0, typeorm_1.OneToMany)(() => employee_model_1.Employee, (employee) => employee.organId),
    __metadata("design:type", Array)
], Organ.prototype, "employes", void 0);
__decorate([
    (0, typeorm_1.OneToMany)(() => division_model_1.Division, (division) => division.organId),
    __metadata("design:type", Array)
], Organ.prototype, "divisions", void 0);
__decorate([
    (0, typeorm_1.OneToMany)(() => incident_model_1.Incident, (incident) => incident.organId),
    __metadata("design:type", Array)
], Organ.prototype, "incidents", void 0);
__decorate([
    (0, typeorm_1.OneToMany)(() => document_model_1.Document, (document) => document.organId),
    __metadata("design:type", Array)
], Organ.prototype, "documents", void 0);
exports.Organ = Organ = __decorate([
    (0, typeorm_1.Entity)({ name: 'organ' })
], Organ);
//# sourceMappingURL=organ.model.js.map