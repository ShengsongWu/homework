import { Controller, Get, Param } from "@nestjs/common";
import { success, UniformResponse } from "src/common";

import { Question } from "./question.entity";
import { QuestionService } from "./question.service";

@Controller("question")
export class QuestionController {
  constructor(private readonly questionService: QuestionService) {}

  @Get("form/:formId")
  async getAllByForm(
    @Param("formId") formId: number
  ): Promise<UniformResponse<Question[]>> {
    const result = await this.questionService.findAllByform(formId);
    return success(result);
  }
}
