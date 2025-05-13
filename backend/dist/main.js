"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const core_1 = require("@nestjs/core");
const app_module_1 = require("./modules/app/app.module");
const platform_express_1 = require("@nestjs/platform-express");
const express = require("express");
const server = express();
async function bootstrap() {
    const app = await core_1.NestFactory.create(app_module_1.AppModule, new platform_express_1.ExpressAdapter(server));
    app.enableCors();
    await app.init();
}
bootstrap();
exports.default = server;
//# sourceMappingURL=main.js.map