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
exports.SeedController = void 0;
const common_1 = require("@nestjs/common");
const seed_service_1 = require("./seed.service");
const public_decorator_1 = require("../auth/decorators/public.decorator");
let SeedController = class SeedController {
    constructor(seedService) {
        this.seedService = seedService;
    }
    async seedDataOrgan() {
        await this.seedService.seedDataOrgan();
        return 'Таблица organ успешно заполнена!';
    }
    async seedDataDivision() {
        await this.seedService.seedDataDivision();
        return 'Таблица division успешно заполнена!';
    }
    async seedDataPositionEmployee() {
        await this.seedService.seedDataPositionEmployee();
        return 'Таблица position-employee успешно заполнена!';
    }
    async seedOrganDivisionPost() {
        await this.seedService.allOrganDivisionPost();
    }
    async seedDataCreateExampleEmployes() {
        return await this.seedService.createExampleEmployes();
    }
    async seedDataAll() {
        return await this.seedService.allSeed();
    }
    async seedDataAllTest() {
        return `all-seed-test`;
    }
};
exports.SeedController = SeedController;
__decorate([
    (0, common_1.Get)('fill-organ'),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", Promise)
], SeedController.prototype, "seedDataOrgan", null);
__decorate([
    (0, common_1.Get)('fill-division'),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", Promise)
], SeedController.prototype, "seedDataDivision", null);
__decorate([
    (0, common_1.Get)('fill-position-employee'),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", Promise)
], SeedController.prototype, "seedDataPositionEmployee", null);
__decorate([
    (0, common_1.Get)('fill-organ-division-post'),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", Promise)
], SeedController.prototype, "seedOrganDivisionPost", null);
__decorate([
    (0, common_1.Get)('create-employes'),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", Promise)
], SeedController.prototype, "seedDataCreateExampleEmployes", null);
__decorate([
    (0, public_decorator_1.Public)(),
    (0, common_1.Get)('all-seed'),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", Promise)
], SeedController.prototype, "seedDataAll", null);
__decorate([
    (0, public_decorator_1.Public)(),
    (0, common_1.Get)('all-seed-test'),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", Promise)
], SeedController.prototype, "seedDataAllTest", null);
exports.SeedController = SeedController = __decorate([
    (0, common_1.Controller)('seed'),
    __metadata("design:paramtypes", [seed_service_1.SeedService])
], SeedController);
//# sourceMappingURL=seed.controller.js.map