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
exports.SeedService = void 0;
const common_1 = require("@nestjs/common");
const typeorm_1 = require("@nestjs/typeorm");
const division_model_1 = require("../division/entity/division.model");
const organ_model_1 = require("../organ/entity/organ.model");
const typeorm_2 = require("typeorm");
const auth_service_1 = require("../auth/auth.service");
const position_employee_model_1 = require("../position-employee/entity/position-employee.model");
let SeedService = class SeedService {
    constructor(organRepository, divisionRepository, positionEmployeeRepository, authService) {
        this.organRepository = organRepository;
        this.divisionRepository = divisionRepository;
        this.positionEmployeeRepository = positionEmployeeRepository;
        this.authService = authService;
    }
    async seedDataOrgan() {
        const postData = [
            { name: 'ОМВД России по городу Анапе', adress: 'г. Анапа, ул. Краснодарская, 111' },
            { name: 'ОМВД России по городу Абинску', adress: 'г. Обнинск, просп. Ленина, 89' },
        ];
        try {
            await this.organRepository.save(postData);
            common_1.Logger.log('Данные успешно сохранены');
        }
        catch (error) {
            common_1.Logger.error(`Ошибка при заполнении данных: ${error.message}`, error.stack);
        }
    }
    async seedDataDivision() {
        const postData = [
            { name: 'Следственный отдел', organId: 1 },
            { name: 'Уголовный розыск', organId: 1 },
        ];
        try {
            await this.divisionRepository.save(postData);
            common_1.Logger.log('Данные успешно сохранены');
        }
        catch (error) {
            common_1.Logger.error(`Ошибка при заполнении данных: ${error.message}`, error.stack);
        }
    }
    async seedDataPositionEmployee() {
        const postData = [
            { value: 'Следователь', description: 'Не важно' },
            { value: 'Оперуполномоченный', description: 'Не важно' },
            { value: 'Инспектор дежурной части', description: 'Не важно' },
            { value: 'Начальник следственного отдела', description: 'Не важно' },
            { value: 'Заместитель начальника отдела', description: 'Не важно' },
        ];
        try {
            await this.positionEmployeeRepository.save(postData);
            common_1.Logger.log('Данные успешно сохранены');
        }
        catch (error) {
            common_1.Logger.error(`Ошибка при заполнении данных: ${error.message}`, error.stack);
        }
    }
    async createExampleEmployes() {
        const postData = [
            { email: 'employee1@.mail.ru', password: 'password', postid: 1, divisionid: 1, organid: 1, },
            { email: 'employee2@.mail.ru', password: 'password', organid: 1, divisionid: 1, postid: 1 },
        ];
        try {
            for (let i = 0; i < postData.length; i++) {
                await this.authService.registration(postData[i]);
            }
            common_1.Logger.log('Данные успешно сохранены');
            return 'Данные успешно сохранены';
        }
        catch (error) {
            common_1.Logger.error(`Ошибка при заполнении данных: ${error.message}`, error.stack);
            return error.message;
        }
    }
    async allOrganDivisionPost() {
        await this.seedDataOrgan();
        await this.seedDataDivision();
        await this.seedDataPositionEmployee();
    }
    async allSeed() {
        await this.seedDataOrgan();
        await this.seedDataDivision();
        await this.seedDataPositionEmployee();
        return await this.createExampleEmployes();
    }
};
exports.SeedService = SeedService;
exports.SeedService = SeedService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, typeorm_1.InjectRepository)(organ_model_1.Organ)),
    __param(1, (0, typeorm_1.InjectRepository)(division_model_1.Division)),
    __param(2, (0, typeorm_1.InjectRepository)(position_employee_model_1.PositionEmployee)),
    __metadata("design:paramtypes", [typeorm_2.Repository,
        typeorm_2.Repository,
        typeorm_2.Repository,
        auth_service_1.AuthService])
], SeedService);
//# sourceMappingURL=seed.service.js.map