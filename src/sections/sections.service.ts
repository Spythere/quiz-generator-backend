import { Injectable } from '@nestjs/common';
import { DatabaseService } from '../database/database.service';
import { CreateSectionDto } from './dto/create-section.dto';
import { UpdateSectionDto } from './dto/update-section.dto';
import { RemoveSectionsDto } from './dto/remove-sections.dto';
import { AddQuestionDto } from './dto/add-question-dto';

@Injectable()
export class SectionsService {
  constructor(private readonly dbService: DatabaseService) {}

  create({ title }: CreateSectionDto) {
    return this.dbService.questionSection.create({
      data: {
        title,
      },
    });
  }

  findAll() {
    return this.dbService.questionSection.findMany({
      include: {
        _count: {
          select: {
            questions: true,
            quizes: true,
          },
        },
      },
    });
  }

  findOne(id: number) {
    const sectionDoc = this.dbService.questionSection.findFirst({
      where: { id: id },
      include: {
        questions: {
          select: {
            id: true,
            title: true,
          },
        },
        quizes: {
          select: {
            id: true,
            title: true,
          },
        },
      },
    });

    return sectionDoc;
  }

  findByTitle(title: string, quizId: number) {
    return this.dbService.questionSection.findMany({
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

  update(id: number, updateSectionDto: UpdateSectionDto) {
    return this.dbService.questionSection.update({
      where: { id: id },
      data: updateSectionDto,
    });
  }

  addQuestion(dto: AddQuestionDto) {
    return this.dbService.questionSection.update({
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
    return this.dbService.questionSection.update({
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
    return this.dbService.questionSection.delete({ where: { id: id } });
  }

  removeMany(dto: RemoveSectionsDto) {
    return this.dbService.questionSection.deleteMany({
      where: { id: { in: dto.ids } },
    });
  }
}
