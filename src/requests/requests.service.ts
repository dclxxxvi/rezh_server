import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import { Request } from './requests.model';
import { CreateRequestDto } from './dto/create-request.dto';
import { IRequest } from '../types/Request';
import { FilesService, FileType } from '../files/files.service';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class RequestsService {
    constructor(
        @InjectModel(Request) private readonly requestRepository: typeof Request,
        private filesService: FilesService,
        private jwtService: JwtService,
    ) {}

    async getAll(limit, page, query, order) {
        const offset = page ?? (page - 1) * limit;
        const requests = await this.requestRepository.findAndCountAll({ where: {}, limit, offset });
        return requests;
    }

    async getById(id: number) {
        const request = await this.requestRepository.findByPk(id);
        return request;
    }

    async create(dto: CreateRequestDto, req: IRequest, _files: Express.Multer.File[]) {
        const user_id = this.jwtService.verify(req.headers.authorization?.split(' ')?.[1])?.id;
        const files = this.filesService.createFiles(FileType.REQUESTS_FILES, _files);
        const request = await this.requestRepository.create({ ...dto, files, user_id});
        return request;
    }
}
