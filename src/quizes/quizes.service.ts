import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateQuizDto } from './dto/create-quiz.dto';
import { UpdateQuizDto } from './dto/update-quiz.dto';
import { DatabaseService } from '../database/database.service';
import { RemoveQuizesDto } from './dto/remove-quizes.dto';
import { AddQuestionDto } from './dto/add-question-dto';

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
      include: {
        questions: {
          select: {
            id: true,
            title: true,
          },
        },
      },
    });

    return quizDoc;
  }

  update(id: number, updateQuizDto: UpdateQuizDto) {
    return this.dbService.quiz.update({
      where: { id: id },
      data: updateQuizDto,
    });
  }

  addQuestion(dto: AddQuestionDto) {
    return this.dbService.quiz.update({
      where: {
        id: dto.quizId,
      },
      data: {
        questions: {
          connect: {
            id: dto.questionId,
          },
        },
      },
    });
  }

  removeQuestion(dto: AddQuestionDto) {
    return this.dbService.quiz.update({
      where: {
        id: dto.quizId,
      },
      data: {
        questions: {
          disconnect: {
            id: dto.questionId,
          },
        },
      },
    });
  }

  remove(id: number) {
    return this.dbService.quiz.delete({ where: { id: id } });
  }

  removeMany(dto: RemoveQuizesDto) {
    return this.dbService.quiz.deleteMany({ where: { id: { in: dto.ids } } });
  }
}
