import { Module } from '@nestjs/common';
import { QuestionsService } from './questions.service';
import { QuestionsController } from './questions.controller';
import { DatabaseService } from '../database/database.service';

@Module({
  controllers: [QuestionsController],
  providers: [QuestionsService, DatabaseService],
})
export class QuestionsModule {}
