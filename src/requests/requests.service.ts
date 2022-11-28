import { BadRequestException, Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import { Request } from './requests.model';
import { CreateRequestDto } from './dto/create-request.dto';
import { IRequest } from '../types/Request';
import { FilesService, FileType } from '../files/files.service';
import { JwtService } from '@nestjs/jwt';
import { ModerateRequestDto } from './dto/moderate-request.dto';

@Injectable()
export class RequestsService {
    constructor(
        @InjectModel(Request) private readonly requestRepository: typeof Request,
        private filesService: FilesService,
        private jwtService: JwtService,
    ) {}

    async getAll(limit, page, query, order) {
        const offset = page ?? (page - 1) * limit;
        const requests = await this.requestRepository.findAndCountAll({
            where: {
                ...query
            }, limit, offset, include: { all: true },
        });
        return requests;
    }

    async getById(id: number) {
        const request = await this.requestRepository.findByPk(id);
        return request;
    }

    async create(dto: CreateRequestDto, req: IRequest, _files: Express.Multer.File[]) {
        const user_id = this.jwtService.verify(req.headers.authorization?.split(' ')?.[1])?.id;
        const files = this.filesService.createFiles(FileType.REQUESTS_FILES, _files);
        const request = await this.requestRepository.create({ ...dto, files, user_id });
        return request;
    }

    async edit(id: number, dto: CreateRequestDto, req: IRequest, _files: Express.Multer.File[]) {
        const existing = await this.getById(id);
        const user_id = this.jwtService.verify(req.headers.authorization?.split(' ')?.[1])?.id;

        if (!existing && user_id !== existing.user_id) {
            throw new BadRequestException({}, 'Обращения не существует');
        }
        if (_files && existing.files) {
            this.filesService.removeFiles(existing.files);
        }
        const files = _files
            ? this.filesService.createFiles(FileType.REQUESTS_FILES, _files)
            : existing.files;

        const updated = await this.requestRepository
            .update({ ...dto, files, moderated: false, approved: false, moderating_text: undefined }, {
                where: { id },
                returning: true,
            });
        return updated[1][0];
    }

    async delete(id: number) {
        const existing = await this.getById(id);
        if (!existing) {
            throw new BadRequestException({}, 'Обращения не существует');
        }
        this.filesService.removeFiles(existing.files);
        await this.requestRepository.destroy({ where: { id } });
        return 'Обращение удалено';
    }

    async moderate(id: number, dto: ModerateRequestDto) {
        const request = await this.getById(id);
        if (!request) {
            throw new BadRequestException({}, 'Обращения не существует');
        }

        const moderated = await this.requestRepository.update({ ...dto, moderated: true }, {
            where: { id },
            returning: true,
        });
        return moderated;
    }

    // async moderateEdit(id: number, dto: ModerateRequestDto) {
    //     const request = await this.getById(id);
    //     if (!request) {
    //         throw new BadRequestException({}, 'Обращения не существует');
    //     }
    //     const moderated = await this.requestRepository.update({ ...dto }, { where: { id }, returning: true });
    //     return moderated[1][0];
    // }
}
