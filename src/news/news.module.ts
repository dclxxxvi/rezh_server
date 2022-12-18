import { Module } from '@nestjs/common';
import { SequelizeModule } from '@nestjs/sequelize';
import { FilesModule } from 'src/files/files.module';
import { NewsController } from './news.controller';
import { News } from './news.model';
import { NewsService } from './news.service';
import { TagsNews } from '../tags/tags-news.model';

@Module({
    controllers: [NewsController],
    providers: [NewsService],
    imports: [
        SequelizeModule.forFeature([News, TagsNews]),
        FilesModule
    ]
})
export class NewsModule {}
