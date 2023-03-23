import { ApiProperty } from '@nestjs/swagger';
import { IsArray } from 'class-validator';

export class RemoveQuizesDto {
  @ApiProperty()
  @IsArray()
  ids: number[];
}
