import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { DataSource, Repository } from 'typeorm';
import { FormDto } from './form.dto';
import { Form } from './form.entity';
import { QuestionService } from 'src/question/question.service';

@Injectable()
export class FormService {
  constructor(
    @InjectRepository(Form)
    private formRepository: Repository<Form>,
    private questionService: QuestionService,
    private dataSource: DataSource,
  ) {}

  findAll(): Promise<Form[]> {
    return this.formRepository.find();
  }

  findByPage(page: number, pageSize: number): Promise<Form[]> {
    return this.formRepository
      .createQueryBuilder('f')
      .orderBy('f.id')
      .skip((page - 1) * pageSize)
      .take(pageSize)
      .getMany();
  }

  findOne(id: number): Promise<Form> {
    return this.formRepository.findOneBy({ id });
  }

  async create(createFormDto: FormDto): Promise<void> {
    const form = new Form();
    const now = new Date();
    form.title = createFormDto.title;
    form.createdAt = now;
    form.questions = createFormDto.questions.map((q) => ({
      ...q,
      createdAt: now,
    }));
    await this.formRepository.save(form);
  }

  async edit(editFormDto: FormDto): Promise<void> {
    const form = new Form();
    const now = new Date();
    form.id = editFormDto.id;
    form.createdAt = editFormDto.createdAt;
    form.title = editFormDto.title;
    form.updatedAt = now;
    form.questions = editFormDto.questions.map((q) => ({
      ...q,
      updatedAt: now,
    }));
    await this.formRepository.save(form);
  }

  async remove(id: string): Promise<void> {
    const queryRunner = this.dataSource.createQueryRunner();

    await queryRunner.connect();
    await queryRunner.startTransaction();
    try {
      await this.questionService.removeByForm(parseInt(id));
      await this.formRepository.delete(id);

      await queryRunner.commitTransaction();
    } catch (err) {
      await queryRunner.rollbackTransaction();
    } finally {
      await queryRunner.release();
    }
  }
}
