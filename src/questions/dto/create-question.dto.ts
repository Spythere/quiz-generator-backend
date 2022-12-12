import { ArrayMaxSize, IsArray, IsInt, IsString } from 'class-validator';

export class CreateQuestionDto {
  @IsString()
  title: string;

  @IsArray()
  @IsString({ each: true })
  @ArrayMaxSize(4)
  answers: string[];

  @IsInt()
  correctAnswerIndex: number;
}
