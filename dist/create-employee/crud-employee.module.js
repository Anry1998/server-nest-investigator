"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.CrudEmployeeModule = void 0;
const common_1 = require("@nestjs/common");
const crud_employee_controller_1 = require("./crud-employee.controller");
const crud_employee_service_1 = require("./crud-employee.service");
const typeorm_1 = require("@nestjs/typeorm");
const employee_model_1 = require("./entity/employee.model");
const position_employee_module_1 = require("../position-employee/position-employee.module");
const position_employee_model_1 = require("../position-employee/entity/position-employee.model");
const organ_module_1 = require("../organ/organ.module");
const organ_model_1 = require("../organ/entity/organ.model");
const division_module_1 = require("../division/division.module");
let CrudEmployeeModule = class CrudEmployeeModule {
};
exports.CrudEmployeeModule = CrudEmployeeModule;
exports.CrudEmployeeModule = CrudEmployeeModule = __decorate([
    (0, common_1.Module)({
        controllers: [crud_employee_controller_1.CrudEmployeeController],
        providers: [crud_employee_service_1.CrudEmployeeService,],
        imports: [
            typeorm_1.TypeOrmModule.forFeature([employee_model_1.Employee, position_employee_model_1.PositionEmployee, organ_model_1.Organ]),
            (0, common_1.forwardRef)(() => position_employee_module_1.PositionEmployeeModule),
            organ_module_1.OrganModule,
            division_module_1.DivisionModule
        ],
        exports: [
            crud_employee_service_1.CrudEmployeeService
        ]
    })
], CrudEmployeeModule);
//# sourceMappingURL=crud-employee.module.js.map