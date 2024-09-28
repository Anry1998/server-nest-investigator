"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.OrganModule = void 0;
const common_1 = require("@nestjs/common");
const organ_controller_1 = require("./organ.controller");
const organ_service_1 = require("./organ.service");
const typeorm_1 = require("@nestjs/typeorm");
const organ_model_1 = require("./entity/organ.model");
let OrganModule = class OrganModule {
};
exports.OrganModule = OrganModule;
exports.OrganModule = OrganModule = __decorate([
    (0, common_1.Module)({
        controllers: [organ_controller_1.OrganController],
        providers: [organ_service_1.OrganService],
        imports: [
            typeorm_1.TypeOrmModule.forFeature([organ_model_1.Organ]),
        ],
        exports: [
            organ_service_1.OrganService
        ]
    })
], OrganModule);
//# sourceMappingURL=organ.module.js.map