"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.LoginDto = void 0;
const dist_1 = require("@nestjs/swagger/dist");
const auth_dto_1 = require("./auth.dto");
class LoginDto extends (0, dist_1.PickType)(auth_dto_1.AuthDto, ['email', 'password']) {
}
exports.LoginDto = LoginDto;
//# sourceMappingURL=login.dto.js.map