import { Injectable } from '@nestjs/common';
import { DatabaseService } from '../database/database.service';
import { CreateSectionDto } from './dto/create-section.dto';
import { UpdateSectionDto } from './dto/update-section.dto';

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
    return this.dbService.questionSection.findMany();
  }

  findOne(id: number) {
    return `This action returns a #${id} section`;
  }

  update(id: number, updateSectionDto: UpdateSectionDto) {
    return `This action updates a #${id} section`;
  }

  remove(id: number) {
    return `This action removes a #${id} section`;
  }
}
