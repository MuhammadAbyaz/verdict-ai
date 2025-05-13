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
exports.OptionController = void 0;
const common_1 = require("@nestjs/common");
const option_service_1 = require("./option.service");
const create_option_dto_1 = require("./option.dtos/create-option.dto");
const passport_1 = require("@nestjs/passport");
let OptionController = class OptionController {
    constructor(optionService) {
        this.optionService = optionService;
    }
    async create(createOptionDto, res) {
        const response = await this.optionService.create(createOptionDto);
        return res.status(201).json(response);
    }
    async findAll(res) {
        const response = await this.optionService.getAll();
        return res.status(200).json(response);
    }
};
exports.OptionController = OptionController;
__decorate([
    (0, common_1.Post)(),
    __param(0, (0, common_1.Body)()),
    __param(1, (0, common_1.Res)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [create_option_dto_1.CreateOptionDto, Object]),
    __metadata("design:returntype", Promise)
], OptionController.prototype, "create", null);
__decorate([
    (0, common_1.Get)(),
    (0, common_1.UseGuards)((0, passport_1.AuthGuard)('jwt')),
    __param(0, (0, common_1.Res)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", Promise)
], OptionController.prototype, "findAll", null);
exports.OptionController = OptionController = __decorate([
    (0, common_1.Controller)('options'),
    __metadata("design:paramtypes", [option_service_1.OptionService])
], OptionController);
//# sourceMappingURL=option.controller.js.map