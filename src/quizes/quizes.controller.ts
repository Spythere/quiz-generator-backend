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

  @Get(':id')
  findOne(@Param('id', ParseIntPipe) id: number) {
    return this.quizesService.findOne(id);
  }

  @Patch(':id')
  update(
    @Param('id', ParseIntPipe) id: number,
    @Body() updateQuizDto: UpdateQuizDto,
  ) {
    return this.quizesService.update(id, updateQuizDto);
  }

  @Delete('/:id')
  remove(@Param('id', ParseIntPipe) id: number) {
    return this.quizesService.remove(id);
  }

  @Post('/removeMany')
  removeMany(@Body() dto: RemoveQuizesDto) {
    return this.quizesService.removeMany(dto);
  }
}
