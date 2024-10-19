"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const core_1 = require("@nestjs/core");
const app_module_1 = require("./app.module");
const cookieParser = require("cookie-parser");
const swagger_1 = require("@nestjs/swagger");
const validation_pipe_1 = require("./pipes/validation.pipe");
const http_exception_filter_1 = require("./global-filters/http-exception.filter");
const config_1 = require("@nestjs/config");
const all_exceptions_filter_1 = require("./global-filters/all-exceptions.filter");
const jwt_auth_guard_1 = require("./auth/guard/jwt-auth.guard");
const jwt_1 = require("@nestjs/jwt");
const post_guard_1 = require("./auth/guard/post.guard");
async function bootstrap() {
    const PORT = process.env.APP_PORT || 5000;
    const app = await core_1.NestFactory.create(app_module_1.AppModule);
    app.use(cookieParser());
    app.enableCors({
        credentials: true,
        origin: ['http://localhost:5173']
    });
    const config = new swagger_1.DocumentBuilder()
        .setTitle('Проект nestjs')
        .setDescription('Документация  REST API')
        .setVersion('1.0.0')
        .addTag('V1.0.0')
        .build();
    const document = swagger_1.SwaggerModule.createDocument(app, config);
    swagger_1.SwaggerModule.setup('api', app, document);
    const configServise = app.get(config_1.ConfigService);
    const hhtpAdapterHost = app.get(core_1.HttpAdapterHost);
    app.useGlobalGuards(new jwt_auth_guard_1.JwtAuthGuard(new jwt_1.JwtService(), configServise, new core_1.Reflector()), new post_guard_1.PostGuard(new core_1.Reflector()));
    app.useGlobalPipes(new validation_pipe_1.ValidationPipe());
    app.useGlobalFilters(new http_exception_filter_1.HttpExceptionFilter(configServise), new all_exceptions_filter_1.AllExceptionsFilter(hhtpAdapterHost));
    await app.listen(PORT, () => console.log(`Сервер стартовал на порту ${PORT}`));
}
bootstrap();
//# sourceMappingURL=main.js.map