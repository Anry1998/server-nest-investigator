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
exports.OrganService = void 0;
const common_1 = require("@nestjs/common");
const typeorm_1 = require("@nestjs/typeorm");
const typeorm_2 = require("typeorm");
const organ_model_1 = require("./entity/organ.model");
let OrganService = class OrganService {
    constructor(organRepository) {
        this.organRepository = organRepository;
    }
    async createOrgan(dto) {
        const organ = await this.organRepository.findOne({
            where: [{ name: dto.name }]
        });
        if (organ) {
            throw new common_1.HttpException(`Орган: ${dto.name} уже существует`, common_1.HttpStatus.BAD_REQUEST);
        }
        return await this.organRepository.save(dto);
    }
    async getOrganById(organId) {
        try {
            const organ = await this.organRepository.findOne({ where: { id: organId } });
            return organ;
        }
        catch (e) {
            return e.message;
        }
    }
};
exports.OrganService = OrganService;
exports.OrganService = OrganService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, typeorm_1.InjectRepository)(organ_model_1.Organ)),
    __metadata("design:paramtypes", [typeorm_2.Repository])
], OrganService);
//# sourceMappingURL=organ.service.js.map