import { Controller, Get, Param } from "@nestjs/common";
import { success, UniformResponse } from "../common";
import { ApiOperation, ApiResponse, ApiTags } from "@nestjs/swagger";
import { Question } from "./question.entity";
import { QuestionService } from "./question.service";

@ApiTags("questions")
@Controller("question")
export class QuestionController {
  constructor(private readonly questionService: QuestionService) {}

  @ApiOperation({ summary: "Get form questions by form id" })
  @ApiResponse({
    status: 200,
    type: Array<Question>,
  })
  @Get("form/:formId")
  async getAllByForm(
    @Param("formId") formId: number
  ): Promise<UniformResponse<Question[]>> {
    const result = await this.questionService.findAllByform(formId);
    return success(result);
  }
}
