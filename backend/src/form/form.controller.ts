import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Put,
} from "@nestjs/common";
import { PageResult, success, UniformResponse } from "../common";
import { FormDto } from "./form.dto";
import { Form } from "./form.entity";
import { FormService } from "./form.service";

@Controller("form")
export class FormController {
  constructor(private readonly formService: FormService) {}

  @Get("page/:page/:size")
  async list(
    @Param("page") page: number,
    @Param("size") size: number
  ): Promise<UniformResponse<PageResult<Form[]>>> {
    const result = await this.formService.findByPage(page, size);
    return success(result);
  }

  @Get(":id")
  async getOne(@Param("id") id: number): Promise<UniformResponse<Form>> {
    const result = await this.formService.findOne(id);
    return success(result);
  }

  @Post()
  async create(@Body() createFormDto: FormDto): Promise<UniformResponse<void>> {
    await this.formService.create(createFormDto);
    return success();
  }

  @Put()
  async edit(@Body() editFormDto: FormDto): Promise<UniformResponse<void>> {
    await this.formService.edit(editFormDto);
    return success();
  }

  @Delete(":id")
  async delete(@Param("id") id: string): Promise<UniformResponse<void>> {
    await this.formService.remove(id);
    return success();
  }
}
