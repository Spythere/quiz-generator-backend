import { Injectable } from '@nestjs/common';
import { DatabaseService } from '../database/database.service';
import { CreateQuestionDto } from './dto/create-question.dto';
import { UpdateQuestionDto } from './dto/update-question.dto';

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

        sections: {
          connect: [...sectionIds.map((id) => ({ id }))],
        },
      },
    });
  }

  findAll() {
    return this.dbService.question.findMany();
  }

  findOne(id: number) {
    return this.dbService.question.findUnique({
      where: {
        id,
      },
    });
  }

  update(
    id: number,
    { answers, correctAnswerIndex, sectionIds, title }: UpdateQuestionDto,
  ) {
    return this.dbService.question.update({
      where: {
        id,
      },
      data: {
        answers,
        correctAnswerIndex,
        title,
        sections: sectionIds
          ? {
              connect: [...sectionIds?.map((id) => ({ id }))],
            }
          : undefined,
      },
    });
  }

  // addSection(questionId: string, sectionId: string) {
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
}
