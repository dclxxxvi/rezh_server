import { CreateNewsDto } from './dto/create-news.dto';
import { BadRequestException, Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import { News } from './news.model';
import { FilesService, FileType } from 'src/files/files.service';
import { Op } from 'sequelize';
import { NewsQuery } from './dto/news-query-params.dto';

@Injectable()
export class NewsService {
    constructor(
        @InjectModel(News) private newsRepository: typeof News,
        private filesService: FilesService,
    ) {}

    async create(dto: CreateNewsDto, file: Express.Multer.File, created_by: number) {
        const image = this.filesService.createFile(FileType.NEWS_IMAGE, file);
        const news = await this.newsRepository.create({...dto, created_by, image});
        return news;
    }

    async getAll(limit: number = 10, page: number = 0, query: NewsQuery, order: any) {
        const offset = (!!page && !!limit) ? (page) * limit : 0;
        const news = await this.newsRepository.findAndCountAll({
            limit,
            offset,
            where: {
                ...(query?.search && {
                    [Op.or]: {
                        title: { [Op.iLike]: `%${ query?.search }%` },
                        content: { [Op.iLike]: `%${ query?.search }%` },
                    },
                }),
            },
        });
        return news;
    }

    async getById(id: number) {
        const news = await this.newsRepository.findByPk(id);
        return news;
    }

    async delete(id: number) {
        const existing = await this.getById(id);
        if (!existing) {
            throw new BadRequestException({}, 'Новости не существует');
        }
        this.filesService.removeFile(existing.image);
        await this.newsRepository.destroy({where: {id}});
        return 'Новость удалена';
    }

    async update(id: number, dto: CreateNewsDto, file: Express.Multer.File, created_by: number) {
        const existing = await this.getById(id);        
        if (!existing) {
            throw new BadRequestException({}, 'Новости не существует');
        }
        if (file && existing.image) {
            this.filesService.removeFile(existing.image);
        }
        const image = file 
            ? this.filesService.createFile(FileType.NEWS_IMAGE, file) 
            : existing.image;

        const updated = await this.newsRepository
            .update({...dto, image, created_by}, {where: {id}, returning: true});
        return updated[1][0];
    }
}
