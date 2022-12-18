import { Module } from '@nestjs/common';
import { TagsController } from './tags.controller';
import { TagsService } from './tags.service';
import { SequelizeModule } from '@nestjs/sequelize';
import { User } from '../users/users.model';
import { Request } from '../requests/requests.model';
import { Tags } from './tags.model';
import { News } from '../news/news.model';
import { TagsRequests } from './tags-requests.model';
import { TagsNews } from './tags-news.model';
import { TagsUsers } from './tags-users.model';

@Module({
  controllers: [TagsController],
  providers: [TagsService],
  imports: [
    SequelizeModule.forFeature([Request, User, Tags, News, TagsRequests, TagsNews, TagsUsers])
  ],
  exports: [
      TagsService,
  ]
})
export class TagsModule {}
