"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.InvalidCredentialsException = void 0;
const common_1 = require("@nestjs/common");
class InvalidCredentialsException extends common_1.HttpException {
    constructor(responce) {
        super(responce, common_1.HttpStatus.UNAUTHORIZED);
        this.message = responce;
    }
}
exports.InvalidCredentialsException = InvalidCredentialsException;
//# sourceMappingURL=invalid%20credentials.exception.js.map