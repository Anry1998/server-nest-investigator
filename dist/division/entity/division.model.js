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
exports.Division = void 0;
const employee_model_1 = require("../../create-employee/entity/employee.model");
const organ_model_1 = require("../../organ/entity/organ.model");
const typeorm_1 = require("typeorm");
let Division = class Division {
};
exports.Division = Division;
__decorate([
    (0, typeorm_1.PrimaryGeneratedColumn)('increment'),
    __metadata("design:type", Number)
], Division.prototype, "id", void 0);
__decorate([
    (0, typeorm_1.Column)(),
    __metadata("design:type", String)
], Division.prototype, "name", void 0);
__decorate([
    (0, typeorm_1.CreateDateColumn)(),
    __metadata("design:type", Date)
], Division.prototype, "createTime", void 0);
__decorate([
    (0, typeorm_1.ManyToOne)(() => organ_model_1.Organ, (organ) => organ.divisions),
    (0, typeorm_1.JoinColumn)({ name: 'organ-division', referencedColumnName: 'id' }),
    __metadata("design:type", Number)
], Division.prototype, "organId", void 0);
__decorate([
    (0, typeorm_1.OneToMany)(() => employee_model_1.Employee, (employee) => employee.divisionId),
    (0, typeorm_1.JoinColumn)(),
    __metadata("design:type", Array)
], Division.prototype, "employes", void 0);
exports.Division = Division = __decorate([
    (0, typeorm_1.Entity)({ name: 'division' })
], Division);
//# sourceMappingURL=division.model.js.map