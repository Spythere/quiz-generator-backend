import { ApiProperty } from '@nestjs/swagger';
import { IsArray } from 'class-validator';

export class RemoveQuestionsDto {
  @ApiProperty()
  @IsArray()
  ids: number[];
}
