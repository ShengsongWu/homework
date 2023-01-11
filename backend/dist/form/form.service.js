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
exports.FormService = void 0;
const common_1 = require("@nestjs/common");
const typeorm_1 = require("@nestjs/typeorm");
const typeorm_2 = require("typeorm");
const form_entity_1 = require("./form.entity");
const question_service_1 = require("../question/question.service");
let FormService = class FormService {
    constructor(formRepository, questionService, dataSource) {
        this.formRepository = formRepository;
        this.questionService = questionService;
        this.dataSource = dataSource;
    }
    findAll() {
        return this.formRepository.find();
    }
    findByPage(page, pageSize) {
        return this.formRepository
            .createQueryBuilder('f')
            .orderBy('f.id')
            .skip((page - 1) * pageSize)
            .take(pageSize)
            .getMany();
    }
    findOne(id) {
        return this.formRepository.findOneBy({ id });
    }
    async create(createFormDto) {
        const form = new form_entity_1.Form();
        const now = new Date();
        form.title = createFormDto.title;
        form.createdAt = now;
        form.questions = createFormDto.questions.map((q) => (Object.assign(Object.assign({}, q), { createdAt: now })));
        await this.formRepository.save(form);
    }
    async edit(editFormDto) {
        const form = new form_entity_1.Form();
        const now = new Date();
        form.id = editFormDto.id;
        form.createdAt = editFormDto.createdAt;
        form.title = editFormDto.title;
        form.updatedAt = now;
        form.questions = editFormDto.questions.map((q) => (Object.assign(Object.assign({}, q), { updatedAt: now })));
        await this.formRepository.save(form);
    }
    async remove(id) {
        const queryRunner = this.dataSource.createQueryRunner();
        await queryRunner.connect();
        await queryRunner.startTransaction();
        try {
            await this.questionService.removeByForm(parseInt(id));
            await this.formRepository.delete(id);
            await queryRunner.commitTransaction();
        }
        catch (err) {
            await queryRunner.rollbackTransaction();
        }
        finally {
            await queryRunner.release();
        }
    }
};
FormService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, typeorm_1.InjectRepository)(form_entity_1.Form)),
    __metadata("design:paramtypes", [typeorm_2.Repository,
        question_service_1.QuestionService,
        typeorm_2.DataSource])
], FormService);
exports.FormService = FormService;
//# sourceMappingURL=form.service.js.map