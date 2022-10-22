import { CreateNewsDto } from './dto/create-news.dto';
import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import { News } from './news.model';
import { FilesService, FileType } from 'src/files/files.service';

@Injectable()
export class NewsService {
    constructor(
        @InjectModel(News) private newsRepository: typeof News,
        private filesService: FilesService,
    ) {}

    async create(dto: CreateNewsDto, file: Express.Multer.File, created_by: number) {
        const image = this.filesService.createFile(FileType.NEWS_IMAGE, file);
        const news = this.newsRepository.create({...dto, created_by, image});
        return news;
    }

    async getAll() {
        const news = this.newsRepository.findAll();
        return news;
    }
}
