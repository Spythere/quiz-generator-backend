import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { QuestionsModule } from './questions/questions.module';
import { QuizesModule } from './quizes/quizes.module';
import { SectionsModule } from './sections/sections.module';
import { AuthModule } from './auth/auth.module';
import { DatabaseModule } from './database/database.module';
import { ConfigModule } from '@nestjs/config';
import { APP_GUARD, Reflector } from '@nestjs/core';
import { UserGuard } from './models/guards/user.guard';

@Module({
  imports: [
    QuestionsModule,
    QuizesModule,
    SectionsModule,
    AuthModule,
    DatabaseModule,
    ConfigModule.forRoot({
      isGlobal: true,
    }),
  ],
  controllers: [AppController],
  providers: [
    AppService,
    // {
    //   provide: APP_GUARD,
    //   useFactory: (ref) => new UserGuard(ref),
    //   // inject: [Reflector],
    // },
  ],
})
export class AppModule {}
