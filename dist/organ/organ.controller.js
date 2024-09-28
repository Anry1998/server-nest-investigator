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
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.OrganController = void 0;
const common_1 = require("@nestjs/common");
const organ_service_1 = require("./organ.service");
const create_organ_dto_1 = require("./dto/create-organ.dto");
let OrganController = class OrganController {
    constructor(organService) {
        this.organService = organService;
    }
    create(dto) {
        return this.organService.createOrgan(dto);
    }
    test({ organId }) {
        return this.organService.getOrganById(organId);
    }
};
exports.OrganController = OrganController;
__decorate([
    (0, common_1.Post)('/create'),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [create_organ_dto_1.CreateOrganDto]),
    __metadata("design:returntype", void 0)
], OrganController.prototype, "create", null);
__decorate([
    (0, common_1.Post)('/test'),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", void 0)
], OrganController.prototype, "test", null);
exports.OrganController = OrganController = __decorate([
    (0, common_1.Controller)('organ'),
    __metadata("design:paramtypes", [organ_service_1.OrganService])
], OrganController);
//# sourceMappingURL=organ.controller.js.map