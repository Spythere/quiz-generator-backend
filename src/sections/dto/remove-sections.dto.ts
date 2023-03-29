import { ApiProperty } from '@nestjs/swagger';
import { IsArray } from 'class-validator';

export class RemoveSectionsDto {
  @ApiProperty()
  @IsArray()
  ids: number[];
}
