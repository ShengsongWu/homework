import { Controller, Get } from "@nestjs/common";
import { ApiOperation, ApiResponse, ApiTags } from "@nestjs/swagger";
import { success, UniformResponse } from "../common";
import { sampleForm } from "../form/form.dto";

import { FormService } from "../form/form.service";

@ApiTags("seed")
@Controller("api/seed")
export class SeedController {
  constructor(private readonly formService: FormService) {}

  @ApiOperation({ summary: "Init some test data" })
  @ApiResponse({
    status: 200,
    type: String,
  })
  @Get()
  async seed(): Promise<UniformResponse<string>> {
    for (let i = 1; i <= 20; i++) {
      const sample = sampleForm();
      sample.title = `${sample.title} ${i}`;
      sample.questions = sample.questions.map((q) => ({
        ...q,
        title: `${q.title} ${i}`,
      }));
      await this.formService.create(sample);
    }

    return success("20 forms have been created");
  }
}
