import { Module } from '@nestjs/common';
import { SectionsService } from './sections.service';
import { SectionsController } from './sections.controller';
import { DatabaseService } from '../database/database.service';

@Module({
  controllers: [SectionsController],
  providers: [SectionsService, DatabaseService]
})
export class SectionsModule {}
