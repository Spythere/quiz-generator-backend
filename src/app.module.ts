import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { QuestionsModule } from './questions/questions.module';
import { QuizesModule } from './quizes/quizes.module';
import { SectionsModule } from './sections/sections.module';

@Module({
  imports: [QuestionsModule, QuizesModule, SectionsModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
