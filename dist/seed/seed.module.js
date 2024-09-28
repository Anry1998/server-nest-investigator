"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.SeedModule = void 0;
const common_1 = require("@nestjs/common");
const seed_controller_1 = require("./seed.controller");
const seed_service_1 = require("./seed.service");
const typeorm_1 = require("@nestjs/typeorm");
const organ_model_1 = require("../organ/entity/organ.model");
const division_model_1 = require("../division/entity/division.model");
const auth_module_1 = require("../auth/auth.module");
const position_employee_model_1 = require("../position-employee/entity/position-employee.model");
const employee_model_1 = require("../create-employee/entity/employee.model");
let SeedModule = class SeedModule {
};
exports.SeedModule = SeedModule;
exports.SeedModule = SeedModule = __decorate([
    (0, common_1.Module)({
        controllers: [seed_controller_1.SeedController],
        providers: [seed_service_1.SeedService],
        imports: [
            typeorm_1.TypeOrmModule.forFeature([organ_model_1.Organ, division_model_1.Division, position_employee_model_1.PositionEmployee, employee_model_1.Employee]),
            auth_module_1.AuthModule,
        ],
        exports: [
            seed_service_1.SeedService,
        ]
    })
], SeedModule);
//# sourceMappingURL=seed.module.js.map