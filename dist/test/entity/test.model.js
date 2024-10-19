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
exports.SerializationUser = exports.EmployeeTest = void 0;
const common_1 = require("@nestjs/common");
const class_transformer_1 = require("class-transformer");
let EmployeeTest = class EmployeeTest {
    constructor() {
        this.users = [
            {
                username: 'username1',
                password: 'password'
            },
            {
                username: 'username2',
                password: 'password'
            },
            {
                username: 'username3',
                password: 'password'
            },
            {
                username: 'username4',
                password: 'password'
            },
        ];
    }
    getUsers() {
        return this.users.map((user) => (0, class_transformer_1.plainToClass)(SerializationUser, user));
    }
    getUserByUsername(username) {
        return this.users.find((user) => user.username === username);
    }
};
exports.EmployeeTest = EmployeeTest;
exports.EmployeeTest = EmployeeTest = __decorate([
    (0, common_1.Injectable)()
], EmployeeTest);
class SerializationUser {
    constructor(partial) {
        Object.assign(this, partial);
    }
}
exports.SerializationUser = SerializationUser;
__decorate([
    (0, class_transformer_1.Exclude)(),
    __metadata("design:type", String)
], SerializationUser.prototype, "password", void 0);
//# sourceMappingURL=test.model.js.map