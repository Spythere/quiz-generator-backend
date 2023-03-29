import { ApiProperty } from '@nestjs/swagger';
import { IsNumber } from 'class-validator';

export class AddSectionDto {
  @ApiProperty()
  @IsNumber()
  quizId: number;

  @ApiProperty()
  @IsNumber()
  sectionId: number;
}
