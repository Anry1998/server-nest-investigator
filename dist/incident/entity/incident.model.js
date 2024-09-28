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
exports.Incident = void 0;
const employee_model_1 = require("../../create-employee/entity/employee.model");
const organ_model_1 = require("../../organ/entity/organ.model");
const typeorm_1 = require("typeorm");
let Incident = class Incident {
};
exports.Incident = Incident;
__decorate([
    (0, typeorm_1.PrimaryGeneratedColumn)('increment'),
    __metadata("design:type", Number)
], Incident.prototype, "id", void 0);
__decorate([
    (0, typeorm_1.CreateDateColumn)(),
    __metadata("design:type", Date)
], Incident.prototype, "createTime", void 0);
__decorate([
    (0, typeorm_1.ManyToOne)(() => organ_model_1.Organ, (organ) => organ.divisions),
    (0, typeorm_1.JoinColumn)({ name: 'organ-incident', referencedColumnName: 'id' }),
    __metadata("design:type", Number)
], Incident.prototype, "organId", void 0);
__decorate([
    (0, typeorm_1.ManyToMany)(() => employee_model_1.Employee, {
        cascade: true,
        eager: true,
    }),
    (0, typeorm_1.JoinColumn)({ name: 'incident-employee', referencedColumnName: 'id' }),
    __metadata("design:type", Array)
], Incident.prototype, "employes", void 0);
exports.Incident = Incident = __decorate([
    (0, typeorm_1.Entity)({ name: 'incident' })
], Incident);
//# sourceMappingURL=incident.model.js.map