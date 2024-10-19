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
exports.EmployeeIdInQuery = void 0;
const common_1 = require("@nestjs/common");
const chat_service_1 = require("../chat.service");
chat_service_1.ChatService;
let EmployeeIdInQuery = class EmployeeIdInQuery {
    constructor() { }
    async canActivate(context) {
        const req = context.switchToHttp().getRequest();
        const startQuery = req._parsedUrl.query;
        const queryArr = startQuery.split('&');
        let serchQueryEmployeId = '';
        for (let i = 0; i < queryArr.length; i++) {
            if (queryArr[i].startsWith("employeId")) {
                serchQueryEmployeId = queryArr[i];
            }
        }
        if (serchQueryEmployeId) {
            const cutStartQuery = `${serchQueryEmployeId}`.replace('employeId=', '');
            if (req.employee.payload.id == cutStartQuery)
                return true;
            else
                return false;
        }
        return true;
    }
};
exports.EmployeeIdInQuery = EmployeeIdInQuery;
exports.EmployeeIdInQuery = EmployeeIdInQuery = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [])
], EmployeeIdInQuery);
//# sourceMappingURL=employee-id-in-query.guard.js.map