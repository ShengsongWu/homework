import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Put,
} from '@nestjs/common';
import { FormDto } from './form.dto';
import { Form } from './form.entity';
import { FormService } from './form.service';

@Controller('form')
export class FormController {
  constructor(private readonly formService: FormService) {}

  @Get(':page/:size')
  list(
    @Param('page') page: number,
    @Param('size') size: number,
  ): Promise<Form[]> {
    return this.formService.findByPage(page, size);
  }

  @Post()
  create(@Body() createFormDto: FormDto): Promise<void> {
    return this.formService.create(createFormDto);
  }

  @Put()
  edit(@Body() editFormDto: FormDto): Promise<void> {
    return this.formService.edit(editFormDto);
  }

  @Delete(':id')
  delete(@Param('id') id: string): Promise<void> {
    return this.formService.remove(id);
  }
}
