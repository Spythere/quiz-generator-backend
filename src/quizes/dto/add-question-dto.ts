import { ApiProperty } from '@nestjs/swagger';
import { IsNumber } from 'class-validator';

export class AddQuestionDto {
  @ApiProperty()
  @IsNumber()
  quizId: number;

  @ApiProperty()
  @IsNumber()
  questionId: number;
}
