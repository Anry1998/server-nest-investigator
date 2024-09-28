"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const core_1 = require("@nestjs/core");
const app_module_1 = require("./app.module");
const cookieParser = require("cookie-parser");
const swagger_1 = require("@nestjs/swagger");
async function bootstrap() {
    const PORT = process.env.APP_PORT || 5000;
    const app = await core_1.NestFactory.create(app_module_1.AppModule);
    app.use(cookieParser());
    app.enableCors({
        credentials: true,
        origin: ['*']
    });
    const config = new swagger_1.DocumentBuilder()
        .setTitle('Проект nestjs')
        .setDescription('Документация  REST API')
        .setVersion('1.0.0')
        .addTag('V1.0.0')
        .build();
    const document = swagger_1.SwaggerModule.createDocument(app, config);
    swagger_1.SwaggerModule.setup('api', app, document);
    await app.listen(PORT, () => console.log(`Сервер стартовал на порту ${PORT}`));
}
bootstrap();
//# sourceMappingURL=main.js.map