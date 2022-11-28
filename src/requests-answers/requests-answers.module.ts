import { Module } from '@nestjs/common';
import { RequestsAnswersController } from './requests-answers.controller';
import { RequestsAnswersService } from './requests-answers.service';
import { SequelizeModule } from '@nestjs/sequelize';
import { RequestAnswer } from './requests-answers.model';
import { FilesModule } from '../files/files.module';
import { RequestsModule } from '../requests/requests.module';

@Module({
  controllers: [RequestsAnswersController],
  providers: [RequestsAnswersService],
  imports: [
      SequelizeModule.forFeature([RequestAnswer]),
      FilesModule,
      RequestsModule,
  ]
})
export class RequestsAnswersModule {}
