import { Injectable } from '@nestjs/common';
import { DatabaseService } from '../database/database.service';
import { CreateQuestionDto } from './dto/create-question.dto';
import { UpdateQuestionDto } from './dto/update-question.dto';
import { RemoveQuestionsDto } from './dto/remove-questions.dto';

@Injectable()
export class QuestionsService {
  constructor(private readonly dbService: DatabaseService) {}

  create({
    answers,
    correctAnswerIndex,
    title,
    sectionIds,
  }: CreateQuestionDto) {
    return this.dbService.question.create({
      data: {
        title,
        correctAnswerIndex,
        answers,

        // sections: {
        //   connect: [...sectionIds?.map((id) => ({ id }))],
        // },
      },
    });
  }

  findAll() {
    return this.dbService.question.findMany();
  }

  findOne(id: number) {
    return this.dbService.question.findUnique({
      where: {
        id: Number(id),
      },
    });
  }

  findByTitle(title: string, quizId: number) {
    return this.dbService.question.findMany({
      where: {
        title: {
          contains: title,
          mode: 'insensitive',
        },
        quizes: {
          none: {
            id: quizId,
          },
        },
      },
      orderBy: {
        title: 'asc',
      },
      take: 10,
    });
  }

  update(
    id: number,
    {
      answers,
      correctAnswerIndex,
      sectionIds,
      title,
      points,
    }: UpdateQuestionDto,
  ) {
    return this.dbService.question.update({
      where: {
        id: Number(id),
      },
      data: {
        answers,
        correctAnswerIndex,
        title,
        points,
        sections: sectionIds
          ? {
              connect: [...sectionIds?.map((id) => ({ id }))],
            }
          : undefined,
      },
    });
  }

  // addSection(questionId: number, sectionId: number) {
  //    return this.dbService.question.update({
  //     where: {
  //       id:questionId
  //     },
  //     data: {
  //       sectionIds
  //     }
  //   })
  // }

  remove(id: number) {
    return `This action removes a #${id} question`;
  }

  removeMany(dto: RemoveQuestionsDto) {
    return this.dbService.question.deleteMany({
      where: { id: { in: dto.ids } },
    });
  }
}
