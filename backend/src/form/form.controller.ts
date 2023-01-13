import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Put,
} from "@nestjs/common";
import { ApiOperation, ApiResponse, ApiTags } from "@nestjs/swagger";
import { PageResult, success, UniformResponse } from "../common";
import { FormDto } from "./form.dto";
import { Form } from "./form.entity";
import { FormService } from "./form.service";

@ApiTags("forms")
@Controller("form")
export class FormController {
  constructor(private readonly formService: FormService) {}

  @ApiOperation({ summary: "Get forms via pagination way" })
  @ApiResponse({
    status: 200,
    type: Array<Form>,
  })
  @Get("page/:page/:size")
  async list(
    @Param("page") page: number,
    @Param("size") size: number
  ): Promise<UniformResponse<PageResult<Form[]>>> {
    const result = await this.formService.findByPage(page, size);
    return success(result);
  }

  @ApiOperation({ summary: "Get one form by its id" })
  @ApiResponse({
    status: 200,
    type: Form,
  })
  @Get(":id")
  async getOne(@Param("id") id: number): Promise<UniformResponse<Form>> {
    const result = await this.formService.findOne(id);
    return success(result);
  }

  @ApiOperation({ summary: "Create a form with its questions" })
  @ApiResponse({
    status: 201,
  })
  @Post()
  async create(@Body() createFormDto: FormDto): Promise<UniformResponse<void>> {
    await this.formService.create(createFormDto);
    return success();
  }

  @ApiOperation({ summary: "Update a form with its questions" })
  @ApiResponse({
    status: 200,
  })
  @Put()
  async edit(@Body() editFormDto: FormDto): Promise<UniformResponse<void>> {
    await this.formService.edit(editFormDto);
    return success();
  }

  @ApiOperation({ summary: "Delete a form by its id" })
  @ApiResponse({
    status: 200,
  })
  @Delete(":id")
  async delete(@Param("id") id: string): Promise<UniformResponse<void>> {
    await this.formService.remove(id);
    return success();
  }
}
