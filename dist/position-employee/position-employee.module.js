"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.PositionEmployeeModule = void 0;
const common_1 = require("@nestjs/common");
const position_employee_controller_1 = require("./position-employee.controller");
const position_employee_service_1 = require("./position-employee.service");
const typeorm_1 = require("@nestjs/typeorm");
const position_employee_model_1 = require("./entity/position-employee.model");
const crud_employee_module_1 = require("../create-employee/crud-employee.module");
const employee_model_1 = require("../create-employee/entity/employee.model");
let PositionEmployeeModule = class PositionEmployeeModule {
};
exports.PositionEmployeeModule = PositionEmployeeModule;
exports.PositionEmployeeModule = PositionEmployeeModule = __decorate([
    (0, common_1.Module)({
        controllers: [position_employee_controller_1.PositionEmployeeController],
        providers: [position_employee_service_1.PositionEmployeeService,],
        imports: [
            typeorm_1.TypeOrmModule.forFeature([position_employee_model_1.PositionEmployee, employee_model_1.Employee]),
            (0, common_1.forwardRef)(() => crud_employee_module_1.CrudEmployeeModule)
        ],
        exports: [
            position_employee_service_1.PositionEmployeeService
        ]
    })
], PositionEmployeeModule);
//# sourceMappingURL=position-employee.module.js.map