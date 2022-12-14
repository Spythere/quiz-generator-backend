import { ApiProperty } from '@nestjs/swagger';
import {
  ArrayMaxSize,
    IsArray,
  IsInt,
  IsMongoId,
  IsString,
} from 'class-validator';

export class CreateQuestionDto {
  @ApiProperty()
  @IsString()
  title: string;

  @ApiProperty()
  @IsArray()
  @IsString({ each: true })
  @ArrayMaxSize(4)
  answers: string[];

  @ApiProperty()
  @IsInt()
  correctAnswerIndex: number;

  @ApiProperty()
  @IsArray()
  @IsMongoId({ each: true })
  sectionIds: string[];
}
