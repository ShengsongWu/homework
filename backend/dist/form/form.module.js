"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.FormModule = void 0;
const common_1 = require("@nestjs/common");
const typeorm_1 = require("@nestjs/typeorm");
const form_entity_1 = require("./form.entity");
const form_service_1 = require("./form.service");
const form_controller_1 = require("./form.controller");
const question_module_1 = require("../question/question.module");
let FormModule = class FormModule {
};
FormModule = __decorate([
    (0, common_1.Module)({
        imports: [typeorm_1.TypeOrmModule.forFeature([form_entity_1.Form]), question_module_1.QuestionModule],
        controllers: [form_controller_1.FormController],
        providers: [form_service_1.FormService],
        exports: [form_service_1.FormService],
    })
], FormModule);
exports.FormModule = FormModule;
//# sourceMappingURL=form.module.js.map