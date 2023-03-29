import { ApiProperty } from '@nestjs/swagger';
import {
  ArrayMaxSize,
  IsArray,
  IsInt,
  IsNumber,
  IsOptional,
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
  @IsOptional()
  sectionIds?: number[];

  @ApiProperty()
  @IsNumber()
  @IsOptional()
  points?: number;
}
