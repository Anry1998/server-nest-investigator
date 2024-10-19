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
exports.AuthService = void 0;
const common_1 = require("@nestjs/common");
const bcrypt_1 = require("bcrypt");
const crud_employee_service_1 = require("../create-employee/crud-employee.service");
const token_service_1 = require("./token.service");
const invalid_credentials_exception_1 = require("./exceptions/invalid credentials.exception");
let AuthService = class AuthService {
    constructor(crudEmployeeService, tokenService) {
        this.crudEmployeeService = crudEmployeeService;
        this.tokenService = tokenService;
    }
    abbreviatedPostList(data) {
        let arr = [];
        data.forEach((element) => {
            Object.entries(element).forEach((element) => {
                if (element[0] === 'id') {
                    arr.push(element[1]);
                }
            });
        });
        return arr;
    }
    hashPassword(password) {
        return (0, bcrypt_1.hash)(password, 10);
    }
    comparePassword(userDtoPassword, userPassword) {
        return (0, bcrypt_1.compare)(userDtoPassword, userPassword);
    }
    async registration(userDto) {
        const condidate = await this.crudEmployeeService.getEmployeeByEmail(userDto.email);
        if (condidate) {
            throw new invalid_credentials_exception_1.InvalidCredentialsException(`Пользователь с таким email: ${userDto.email} уже существует`);
        }
        const hashPassword = await this.hashPassword(userDto.password);
        const employee = await this.crudEmployeeService.createEmployee({ ...userDto, password: hashPassword });
        const employeeEnd = await this.crudEmployeeService.getEmployeeById(employee.id);
        const abbreviatedPostList = this.abbreviatedPostList(employee.post);
        const tokens = await this.tokenService.generateTokens({ id: employee.id, email: employee.email, posts: abbreviatedPostList, organId: employee.organId, divisionId: employee.divisionId });
        await this.tokenService.saveRefreshToken(employee.id, tokens.refreshToken);
        delete employeeEnd.password;
        return { ...tokens, ...employeeEnd };
    }
    async login(userDto) {
        const condidate = await this.crudEmployeeService.getEmployeeByEmail(userDto.email);
        if (!condidate) {
            throw new invalid_credentials_exception_1.InvalidCredentialsException(`Пользователь с email: ${userDto.email} не был найден`);
        }
        const comparePassword = await this.comparePassword(userDto.password, condidate.password);
        if (!comparePassword) {
            throw new common_1.HttpException(`Введен неверный пароль`, common_1.HttpStatus.BAD_REQUEST);
        }
        const abbreviatedPostList = this.abbreviatedPostList(condidate.post);
        const tokens = await this.tokenService.generateTokens({ id: condidate.id, email: condidate.email, posts: abbreviatedPostList, organId: condidate.organId, divisionId: condidate.divisionId });
        await this.tokenService.saveRefreshToken(condidate.id, tokens.refreshToken);
        delete condidate.password;
        return { ...tokens, ...condidate };
    }
    async logout(refreshToken) {
        const token = await this.tokenService.removeRefreshToken(refreshToken);
    }
    async refresh(refreshToken) {
        if (!refreshToken) {
            throw new common_1.HttpException('Токен отсутствует', common_1.HttpStatus.FORBIDDEN);
        }
        const employeeData = await this.tokenService.validateRefreshToken(refreshToken);
        const employee = await this.crudEmployeeService.getEmployeeById(employeeData.payload.id);
        const tokenFromDb = await this.tokenService.findRefreshToken(refreshToken);
        if (!employeeData || !tokenFromDb || !employee) {
            throw new common_1.HttpException('Ошибка авторизации', common_1.HttpStatus.FORBIDDEN);
        }
        const tokens = await this.tokenService.generateTokens({ id: employeeData.payload.id, email: employeeData.payload.email, posts: employeeData.payload.post, organId: employeeData.payload.organId, divisionId: employeeData.payload.divisionId });
        await this.tokenService.saveTokenAfterRefresh(tokenFromDb.id, tokens.refreshToken);
        delete employee.password;
        return { ...tokens, ...employee };
    }
    async getEmployeeId(refreshToken) {
    }
};
exports.AuthService = AuthService;
exports.AuthService = AuthService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [crud_employee_service_1.CrudEmployeeService,
        token_service_1.TokenService])
], AuthService);
//# sourceMappingURL=auth.service.js.map