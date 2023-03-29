import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  UseGuards,
  Query,
  ParseIntPipe,
} from '@nestjs/common';
import { QuizesService } from './quizes.service';
import { CreateQuizDto } from './dto/create-quiz.dto';
import { UpdateQuizDto } from './dto/update-quiz.dto';
import { ApiTags } from '@nestjs/swagger';
import { AuthGuard } from '@nestjs/passport';
import { RemoveQuizesDto } from './dto/remove-quizes.dto';
import { AddQuestionDto } from './dto/add-question-dto';
import { AddSectionDto } from './dto/add-section-dto';

@Controller('quizes')
@ApiTags('quizes')
@UseGuards(AuthGuard('jwt'))
export class QuizesController {
  constructor(private readonly quizesService: QuizesService) {}

  @Post()
  create(@Body() createQuizeDto: CreateQuizDto) {
    return this.quizesService.create(createQuizeDto);
  }

  @Get()
  findAll() {
    return this.quizesService.findAll();
  }

  @Get('/id/:id')
  findOne(@Param('id', ParseIntPipe) id: number) {
    return this.quizesService.findOne(id);
  }

  @Patch('/id/:id')
  update(
    @Param('id', ParseIntPipe) id: number,
    @Body() updateQuizDto: UpdateQuizDto,
  ) {
    return this.quizesService.update(id, updateQuizDto);
  }

  @Post('/addQuestion')
  addQuestion(@Body() dto: AddQuestionDto) {
    return this.quizesService.addQuestion(dto);
  }

  @Post('/removeQuestion')
  removeQuestion(@Body() dto: AddQuestionDto) {
    return this.quizesService.removeQuestion(dto);
  }

  @Post('/addSection')
  addSection(@Body() dto: AddSectionDto) {
    return this.quizesService.addSection(dto);
  }

  @Post('/removeSection')
  removeSection(@Body() dto: AddSectionDto) {
    return this.quizesService.removeSection(dto);
  }

  @Delete('/id/:id')
  remove(@Param('id', ParseIntPipe) id: number) {
    return this.quizesService.remove(id);
  }

  @Post('/removeMany')
  removeMany(@Body() dto: RemoveQuizesDto) {
    return this.quizesService.removeMany(dto);
  }
}
