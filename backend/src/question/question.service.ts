import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Question } from './question.entity';

@Injectable()
export class QuestionService {
  constructor(
    @InjectRepository(Question)
    private questionRepository: Repository<Question>,
  ) {}

  findAll(): Promise<Question[]> {
    return this.questionRepository.find();
  }

  findOne(id: number): Promise<Question> {
    return this.questionRepository.findOneBy({ id });
  }

  async remove(id: string): Promise<void> {
    await this.questionRepository.delete(id);
  }

  async removeByForm(formId: number): Promise<void> {
    await this.questionRepository.delete({ form: { id: formId } });
  }
}
