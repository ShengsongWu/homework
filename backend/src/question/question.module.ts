import { Module } from "@nestjs/common";
import { TypeOrmModule } from "@nestjs/typeorm";
import { Question } from "./question.entity";
import { QuestionService } from "./question.service";
import { QuestionController } from "./question.controller";

@Module({
  imports: [TypeOrmModule.forFeature([Question])],
  providers: [QuestionService],
  exports: [QuestionService],
  controllers: [QuestionController],
})
export class QuestionModule {}
