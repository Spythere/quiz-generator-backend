import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  BadRequestException,
  ParseIntPipe,
  Query,
} from '@nestjs/common';
import { QuestionsService } from './questions.service';
import { CreateQuestionDto } from './dto/create-question.dto';
import { UpdateQuestionDto } from './dto/update-question.dto';
import { ApiTags } from '@nestjs/swagger';
import { RemoveQuestionsDto } from './dto/remove-questions.dto';

@Controller('questions')
@ApiTags('questions')
export class QuestionsController {
  constructor(private readonly questionsService: QuestionsService) {}

  @Post()
  create(@Body() createQuestionDto: CreateQuestionDto) {
    return this.questionsService.create(createQuestionDto);
  }

  @Get()
  findAll() {
    return this.questionsService.findAll();
  }

  @Get('/id/:id')
  findOne(@Param('id', ParseIntPipe) id: number) {
    return this.questionsService.findOne(id);
  }

  @Get('/titles')
  findByTitle(
    @Query('title') title: string,
    @Query('quizId', ParseIntPipe) quizId: number,
  ) {
    return this.questionsService.findByTitle(title, quizId);
  }

  @Patch('/id/:id')
  update(
    @Param('id', ParseIntPipe) id: number,
    @Body() updateQuestionDto: UpdateQuestionDto,
  ) {
    return this.questionsService.update(id, updateQuestionDto);
  }

  // @Patch(':id/addSection/:sectionId')
  // addSection(@Param('id', ParseIntPipe) id: string, @Param('sectionId') sectionId: string) {
  //   return this.questionsService.addSection(id, sectionId);
  // }

  @Delete('/id/:id')
  remove(@Param('id', ParseIntPipe) id: number) {
    return this.questionsService.remove(id);
  }

  @Post('/removeMany')
  removeMany(@Body() dto: RemoveQuestionsDto) {
    return this.questionsService.removeMany(dto);
  }
}
