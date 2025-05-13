"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.dataSourceOptions = void 0;
const typeorm_1 = require("typeorm");
const dotenv_1 = require("dotenv");
const config_1 = require("@nestjs/config");
(0, dotenv_1.config)({ path: '.env' });
const configService = new config_1.ConfigService();
const migrationsPath = __dirname + '/migrations/**/*.{js,ts}';
const entitiesPath = __dirname + '/../modules/**/entities/*.entity.{js,ts}';
exports.dataSourceOptions = {
    url: configService.get('DB_URL'),
    migrations: [migrationsPath],
    migrationsTableName: 'migrations',
    database: configService.get('DB'),
    type: 'postgres',
    entities: [entitiesPath],
    ssl: { rejectUnauthorized: false },
    synchronize: false,
};
exports.default = new typeorm_1.DataSource(exports.dataSourceOptions);
//# sourceMappingURL=config.js.map