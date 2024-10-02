"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.AppModule = void 0;
const common_1 = require("@nestjs/common");
const typeorm_1 = require("@nestjs/typeorm");
const config_1 = require("@nestjs/config");
const env_validation_1 = require("./config/env.validation");
const auth_module_1 = require("./auth/auth.module");
const token_model_1 = require("./auth/entity/token.model");
const crud_employee_module_1 = require("./create-employee/crud-employee.module");
const position_employee_module_1 = require("./position-employee/position-employee.module");
const employee_model_1 = require("./create-employee/entity/employee.model");
const position_employee_model_1 = require("./position-employee/entity/position-employee.model");
const division_module_1 = require("./division/division.module");
const incident_module_1 = require("./incident/incident.module");
const incident_model_1 = require("./incident/entity/incident.model");
const organ_model_1 = require("./organ/entity/organ.model");
const division_model_1 = require("./division/entity/division.model");
const organ_module_1 = require("./organ/organ.module");
const seed_module_1 = require("./seed/seed.module");
const document_module_1 = require("./document/document.module");
const document_model_1 = require("./document/entity/document.model");
const app_gateway_1 = require("./app/app.gateway");
let AppModule = class AppModule {
};
exports.AppModule = AppModule;
exports.AppModule = AppModule = __decorate([
    (0, common_1.Module)({
        imports: [
            (0, common_1.forwardRef)(() => config_1.ConfigModule.forRoot({ isGlobal: true, validate: env_validation_1.validate })),
            config_1.ConfigModule.forRoot({ isGlobal: true, validate: env_validation_1.validate }),
            typeorm_1.TypeOrmModule.forRootAsync({
                imports: [config_1.ConfigModule],
                useFactory: (configService) => ({
                    type: 'postgres',
                    host: configService.get('DB_HOST'),
                    port: configService.get('DB_PORT'),
                    username: configService.get('DB_USERNAME'),
                    password: configService.get('DB_PASSWORD'),
                    database: configService.get('DB_NAME'),
                    entities: [
                        organ_model_1.Organ,
                        division_model_1.Division,
                        incident_model_1.Incident,
                        position_employee_model_1.PositionEmployee,
                        employee_model_1.Employee,
                        token_model_1.Token,
                        document_model_1.Document,
                    ],
                    synchronize: true,
                    logging: configService.get('DB_LOGGING'),
                }),
                inject: [config_1.ConfigService],
            }),
            auth_module_1.AuthModule,
            crud_employee_module_1.CrudEmployeeModule,
            position_employee_module_1.PositionEmployeeModule,
            division_module_1.DivisionModule,
            incident_module_1.IncidentModule,
            organ_module_1.OrganModule,
            seed_module_1.SeedModule,
            document_module_1.DocumentModule
        ],
        controllers: [],
        providers: [app_gateway_1.AppGateway],
    })
], AppModule);
//# sourceMappingURL=app.module.js.map