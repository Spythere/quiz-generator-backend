import { ApiProperty } from '@nestjs/swagger';

export class GetQuestionDto {
  @ApiProperty()
  id: string;
}
