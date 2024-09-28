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
exports.Document = exports.TypeDocyment = void 0;
const organ_model_1 = require("../../organ/entity/organ.model");
const employee_model_1 = require("../../create-employee/entity/employee.model");
const typeorm_1 = require("typeorm");
var TypeDocyment;
(function (TypeDocyment) {
    TypeDocyment["RESOLUTION"] = "\u041F\u041E\u0421\u0422\u0410\u041D\u041E\u0412\u041B\u0415\u041D\u0418\u0415";
    TypeDocyment["PROTOCOL"] = "\u041F\u0420\u041E\u0422\u041E\u041A\u041E\u041B";
    TypeDocyment["REPORT"] = "\u0420\u0410\u041F\u041E\u0420\u0422";
    TypeDocyment["COVER_LETTER"] = "\u0421\u041E\u041F\u0420\u041E\u0412\u041E\u0414\u0418\u0422\u0415\u041B\u042C\u041D\u041E\u0415 \u041F\u0418\u0421\u042C\u041C\u041E";
    TypeDocyment["NOTIFICATION"] = "\u0423\u0412\u0415\u0414\u041E\u041C\u041B\u0415\u041D\u0418\u0415";
})(TypeDocyment || (exports.TypeDocyment = TypeDocyment = {}));
let Document = class Document {
};
exports.Document = Document;
__decorate([
    (0, typeorm_1.PrimaryGeneratedColumn)('increment'),
    __metadata("design:type", Number)
], Document.prototype, "id", void 0);
__decorate([
    (0, typeorm_1.CreateDateColumn)(),
    __metadata("design:type", Date)
], Document.prototype, "createTime", void 0);
__decorate([
    (0, typeorm_1.ManyToOne)(() => organ_model_1.Organ, (organ) => organ.documents, {
        cascade: true,
        eager: true,
    }),
    (0, typeorm_1.JoinColumn)({ name: 'organId', referencedColumnName: 'id' }),
    __metadata("design:type", Number)
], Document.prototype, "organId", void 0);
__decorate([
    (0, typeorm_1.Column)(),
    __metadata("design:type", Number)
], Document.prototype, "form\u0422umber", void 0);
__decorate([
    (0, typeorm_1.Column)(),
    __metadata("design:type", String)
], Document.prototype, "value", void 0);
__decorate([
    (0, typeorm_1.ManyToMany)(() => employee_model_1.Employee, {
        cascade: true,
        eager: true,
    }),
    (0, typeorm_1.JoinTable)({
        name: "employee_document",
        joinColumn: { name: "employeeId", referencedColumnName: "id" },
        inverseJoinColumn: { name: "documentId" }
    }),
    __metadata("design:type", Array)
], Document.prototype, "employee", void 0);
exports.Document = Document = __decorate([
    (0, typeorm_1.Entity)({ name: 'document' })
], Document);
//# sourceMappingURL=document.model.js.map