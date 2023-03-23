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
  findOne(@Param('id') id: string) {
    return this.quizesService.findOne(id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateQuizDto: UpdateQuizDto) {
    return this.quizesService.update(id, updateQuizDto);
  }

  @Delete('/id/:id')
  remove(@Param('id') id: string) {
    return this.quizesService.remove(id);
  }

  @Delete('/many')
  removeMany(@Query('ids') dto: RemoveQuizesDto) {
    return this.quizesService.removeMany(dto.ids);
  }
}
