"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.DivisionModule = void 0;
const common_1 = require("@nestjs/common");
const division_controller_1 = require("./division.controller");
const division_service_1 = require("./division.service");
const typeorm_1 = require("@nestjs/typeorm");
const division_model_1 = require("./entity/division.model");
let DivisionModule = class DivisionModule {
};
exports.DivisionModule = DivisionModule;
exports.DivisionModule = DivisionModule = __decorate([
    (0, common_1.Module)({
        controllers: [division_controller_1.DivisionController],
        providers: [division_service_1.DivisionService],
        imports: [
            typeorm_1.TypeOrmModule.forFeature([division_model_1.Division]),
        ],
        exports: [
            division_service_1.DivisionService
        ]
    })
], DivisionModule);
//# sourceMappingURL=division.module.js.map