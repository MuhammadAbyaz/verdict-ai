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
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.UserService = void 0;
const common_1 = require("@nestjs/common");
const storage_constanst_1 = require("../storage/storage.constanst");
const typeorm_1 = require("@nestjs/typeorm");
const user_entity_1 = require("./entities/user.entity");
const typeorm_2 = require("typeorm");
let UserService = class UserService {
    constructor(userRepository, storageService) {
        this.userRepository = userRepository;
        this.storageService = storageService;
        this.PREFIX = 'users';
    }
    async updateProfilePicture({ userId, profileImage, }) {
        const user = await this.userRepository.findOne({
            where: { id: userId },
        });
        const profileImageUrl = await this.storageService.uploadFile(profileImage, this.PREFIX, userId);
        user.image = profileImageUrl;
        await this.userRepository.save(user);
        return {
            user,
        };
    }
};
exports.UserService = UserService;
exports.UserService = UserService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, typeorm_1.InjectRepository)(user_entity_1.User)),
    __param(1, (0, common_1.Inject)(storage_constanst_1.STORAGE_SERVICE)),
    __metadata("design:paramtypes", [typeorm_2.Repository, Object])
], UserService);
//# sourceMappingURL=user.service.js.map