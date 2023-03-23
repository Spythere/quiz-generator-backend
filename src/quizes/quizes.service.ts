import { Injectable } from '@nestjs/common';
import { CreateQuizDto } from './dto/create-quiz.dto';
import { UpdateQuizDto } from './dto/update-quiz.dto';
import { DatabaseService } from '../database/database.service';

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

  findOne(id: string) {
    return this.dbService.quiz.findUnique({ where: { id: Number(id) } });
  }

  update(id: string, updateQuizDto: UpdateQuizDto) {
    return this.dbService.quiz.update({
      where: { id: Number(id) },
      data: updateQuizDto,
    });
  }

  remove(id: string) {
    return this.dbService.quiz.delete({ where: { id: Number(id) } });
  }
  removeMany(ids: number[]) {
    return this.dbService.quiz.deleteMany({ where: { id: { in: ids } } });
  }
}
