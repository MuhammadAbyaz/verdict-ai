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
exports.SupabaseStorageService = void 0;
const common_1 = require("@nestjs/common");
const supabase_1 = require("./supabase");
const config_1 = require("@nestjs/config");
let SupabaseStorageService = class SupabaseStorageService {
    constructor(configService) {
        this.configService = configService;
        this.supabaseProvider = supabase_1.SupabaseProvider.getInstance();
    }
    async uploadFile(file, prefix, path) {
        const updatedPath = `${prefix}/${path}`;
        const bucketName = this.configService.getOrThrow('BUCKET_NAME');
        const { error } = await this.supabaseProvider.storage
            .from(bucketName)
            .upload(updatedPath, file.buffer, {
            contentType: file?.mimetype,
        });
        if (error)
            throw error;
        const { data } = this.supabaseProvider.storage
            .from(bucketName)
            .getPublicUrl(updatedPath);
        return data.publicUrl;
    }
};
exports.SupabaseStorageService = SupabaseStorageService;
exports.SupabaseStorageService = SupabaseStorageService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [config_1.ConfigService])
], SupabaseStorageService);
//# sourceMappingURL=supabase-storage.service.js.map