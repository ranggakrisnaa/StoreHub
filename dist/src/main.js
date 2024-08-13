'use strict';
var __importDefault =
    (this && this.__importDefault) ||
    function (mod) {
        return mod && mod.__esModule ? mod : { default: mod };
    };
Object.defineProperty(exports, '__esModule', { value: true });
const core_1 = require('@nestjs/core');
const app_module_1 = require('./app.module');
const common_1 = require('@nestjs/common');
const prisma_client_exception_filter_1 = require('./prisma-client-exception/prisma-client-exception.filter');
const platform_express_1 = require('@nestjs/platform-express');
const express_1 = __importDefault(require('express'));
const server = (0, express_1.default)();
async function bootstrap() {
    const app = await core_1.NestFactory.create(app_module_1.AppModule, new platform_express_1.ExpressAdapter(server));
    const { httpAdapter } = app.get(core_1.HttpAdapterHost);
    app.useGlobalPipes(new common_1.ValidationPipe());
    app.useGlobalFilters(new prisma_client_exception_filter_1.PrismaClientExceptionFilter(httpAdapter));
    await app.listen(3000);
}
bootstrap();
exports.default = server;
//# sourceMappingURL=main.js.map
