import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  ParseIntPipe,
  Query,
} from '@nestjs/common';
import { SectionsService } from './sections.service';
import { CreateSectionDto } from './dto/create-section.dto';
import { UpdateSectionDto } from './dto/update-section.dto';
import { ApiTags } from '@nestjs/swagger';
import { RemoveSectionsDto } from './dto/remove-sections.dto';
import { AddQuestionDto } from './dto/add-question-dto';

@Controller('sections')
@ApiTags('sections')
export class SectionsController {
  constructor(private readonly sectionsService: SectionsService) {}

  @Post()
  create(@Body() createSectionDto: CreateSectionDto) {
    return this.sectionsService.create(createSectionDto);
  }

  @Get()
  findAll() {
    return this.sectionsService.findAll();
  }

  @Get('/id/:id')
  findOne(@Param('id', ParseIntPipe) id: number) {
    return this.sectionsService.findOne(id);
  }

  @Patch('/id/:id')
  update(
    @Param('id', ParseIntPipe) id: number,
    @Body() updateSectionDto: UpdateSectionDto,
  ) {
    return this.sectionsService.update(id, updateSectionDto);
  }

  @Get('/titles')
  findByTitle(
    @Query('title') title: string,
    @Query('quizId', ParseIntPipe) quizId: number,
  ) {
    return this.sectionsService.findByTitle(title, quizId);
  }

  @Post('/addQuestion')
  addQuestion(@Body() dto: AddQuestionDto) {
    return this.sectionsService.addQuestion(dto);
  }

  @Post('/removeQuestion')
  removeQuestion(@Body() dto: AddQuestionDto) {
    return this.sectionsService.removeQuestion(dto);
  }

  @Delete('id/:id')
  remove(@Param('id', ParseIntPipe) id: number) {
    return this.sectionsService.remove(id);
  }

  @Post('/removeMany')
  removeMany(@Body() dto: RemoveSectionsDto) {
    return this.sectionsService.removeMany(dto);
  }
}
