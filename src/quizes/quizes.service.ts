import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateQuizDto } from './dto/create-quiz.dto';
import { UpdateQuizDto } from './dto/update-quiz.dto';
import { DatabaseService } from '../database/database.service';
import { RemoveQuizesDto } from './dto/remove-quizes.dto';

@Injectable()
export class QuizesService {
  constructor(private readonly dbService: DatabaseService) {}

  create(createQuizDto: CreateQuizDto) {
    return this.dbService.quiz.create({
      data: {
        title: createQuizDto.title,
        // TODO: link questions
        // TODO: link sections
      },
    });
  }

  findAll() {
    return this.dbService.quiz.findMany({});
  }

  findOne(id: number) {
    const quizDoc = this.dbService.quiz.findFirst({
      where: { id: id },
    });

    return quizDoc;
  }

  update(id: number, updateQuizDto: UpdateQuizDto) {
    return this.dbService.quiz.update({
      where: { id: id },
      data: updateQuizDto,
    });
  }

  remove(id: number) {
    return this.dbService.quiz.delete({ where: { id: id } });
  }

  removeMany(dto: RemoveQuizesDto) {
    return this.dbService.quiz.deleteMany({ where: { id: { in: dto.ids } } });
  }
}
