import { Module } from '@nestjs/common';
import { SequelizeModule } from '@nestjs/sequelize';
import { FilesModule } from 'src/files/files.module';
import { NewsController } from './news.controller';
import { News } from './news.model';
import { NewsService } from './news.service';

@Module({
    controllers: [NewsController],
    providers: [NewsService],
    imports: [
        SequelizeModule.forFeature([News]),
        FilesModule
    ]
})
export class NewsModule {}
