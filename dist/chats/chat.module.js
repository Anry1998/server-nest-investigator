"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.ChatModule = void 0;
const common_1 = require("@nestjs/common");
const typeorm_1 = require("@nestjs/typeorm");
const chat_model_1 = require("./entity/chat.model");
const chat_service_1 = require("./chat.service");
const chat_controller_1 = require("./chat.controller");
const message_model_1 = require("./entity/message.model");
const crud_employee_module_1 = require("../create-employee/crud-employee.module");
const message_service_1 = require("./message.service");
const app_gateway_1 = require("./app.gateway");
const jwt_1 = require("@nestjs/jwt");
const auth_module_1 = require("../auth/auth.module");
const execution_context_host_1 = require("@nestjs/core/helpers/execution-context-host");
const socket_id_model_1 = require("./entity/socket-id.model");
const socket_service_1 = require("./socket.service");
let ChatModule = class ChatModule {
};
exports.ChatModule = ChatModule;
exports.ChatModule = ChatModule = __decorate([
    (0, common_1.Module)({
        imports: [
            typeorm_1.TypeOrmModule.forFeature([chat_model_1.Chat, message_model_1.Messagers, socket_id_model_1.SocketId]),
            crud_employee_module_1.CrudEmployeeModule,
            jwt_1.JwtModule,
            auth_module_1.AuthModule,
            execution_context_host_1.ExecutionContextHost,
        ],
        controllers: [chat_controller_1.ChatController],
        providers: [chat_service_1.ChatService, message_service_1.MessageService, socket_service_1.SocketService, app_gateway_1.MyGateway, execution_context_host_1.ExecutionContextHost],
        exports: [chat_service_1.ChatService, message_service_1.MessageService, socket_service_1.SocketService,],
    })
], ChatModule);
//# sourceMappingURL=chat.module.js.map