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
exports.FormController = void 0;
const common_1 = require("@nestjs/common");
const common_2 = require("../common");
const form_dto_1 = require("./form.dto");
const form_service_1 = require("./form.service");
let FormController = class FormController {
    constructor(formService) {
        this.formService = formService;
    }
    async list(page, size) {
        const result = await this.formService.findByPage(page, size);
        return (0, common_2.success)(result);
    }
    async getOne(id) {
        const result = await this.formService.findOne(id);
        return (0, common_2.success)(result);
    }
    async create(createFormDto) {
        await this.formService.create(createFormDto);
        return (0, common_2.success)();
    }
    async edit(editFormDto) {
        await this.formService.edit(editFormDto);
        return (0, common_2.success)();
    }
    async delete(id) {
        await this.formService.remove(id);
        return (0, common_2.success)();
    }
};
__decorate([
    (0, common_1.Get)("page/:page/:size"),
    __param(0, (0, common_1.Param)("page")),
    __param(1, (0, common_1.Param)("size")),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number, Number]),
    __metadata("design:returntype", Promise)
], FormController.prototype, "list", null);
__decorate([
    (0, common_1.Get)(":id"),
    __param(0, (0, common_1.Param)("id")),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number]),
    __metadata("design:returntype", Promise)
], FormController.prototype, "getOne", null);
__decorate([
    (0, common_1.Post)(),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [form_dto_1.FormDto]),
    __metadata("design:returntype", Promise)
], FormController.prototype, "create", null);
__decorate([
    (0, common_1.Put)(),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [form_dto_1.FormDto]),
    __metadata("design:returntype", Promise)
], FormController.prototype, "edit", null);
__decorate([
    (0, common_1.Delete)(":id"),
    __param(0, (0, common_1.Param)("id")),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", Promise)
], FormController.prototype, "delete", null);
FormController = __decorate([
    (0, common_1.Controller)("form"),
    __metadata("design:paramtypes", [form_service_1.FormService])
], FormController);
exports.FormController = FormController;
//# sourceMappingURL=form.controller.js.map