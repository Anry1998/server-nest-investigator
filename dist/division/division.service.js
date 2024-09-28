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
exports.DivisionService = void 0;
const common_1 = require("@nestjs/common");
const typeorm_1 = require("@nestjs/typeorm");
const typeorm_2 = require("typeorm");
const division_model_1 = require("./entity/division.model");
division_model_1.Division;
let DivisionService = class DivisionService {
    constructor(divisionRepository) {
        this.divisionRepository = divisionRepository;
    }
    async createDivision(dto) {
        const division = await this.divisionRepository.findOne({
            where: [{ name: dto.name }]
        });
        if (division) {
            throw new common_1.HttpException(`Подразделение: ${dto.name} уже существует`, common_1.HttpStatus.BAD_REQUEST);
        }
        return await this.divisionRepository.save(dto);
    }
    async getDivisionById(divisionId) {
        try {
            const division = await this.divisionRepository.findOne({ where: { id: divisionId } });
            console.log(division);
            return division;
        }
        catch (e) {
            return e.message;
        }
    }
};
exports.DivisionService = DivisionService;
exports.DivisionService = DivisionService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, typeorm_1.InjectRepository)(division_model_1.Division)),
    __metadata("design:paramtypes", [typeorm_2.Repository])
], DivisionService);
//# sourceMappingURL=division.service.js.map