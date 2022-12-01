import { BadRequestException, Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import { Request } from '../requests/requests.model';
import { FilesService, FileType } from '../files/files.service';
import { RequestAnswer } from './requests-answers.model';
import { CreateAnswerDto } from './dto/CreateAnswer.dto';
import { RequestsService } from '../requests/requests.service';
import { UsersService } from '../users/users.service';

@Injectable()
export class RequestsAnswersService {
    constructor(
        @InjectModel(RequestAnswer) private readonly requestAnswerRepository: typeof RequestAnswer,
        private filesService: FilesService,
        private requestsService: RequestsService,
        private usersService: UsersService,
    ) {}

    async getAll() {
        return await this.requestAnswerRepository.findAll({ where: {}, include: { all: true } });
    }

    async getById(id: number) {
        return await this.requestAnswerRepository.findByPk(id, { include: { all: true } });
    }

    async addAnswer(dto: CreateAnswerDto, request_id: number, answerer_id: number, _files: Express.Multer.File[]) {
        const request = await this.requestsService.getById(request_id);
        if (!request) {
            throw new NotFoundException({}, 'Обращение с указанным id не найдено');
        }
        const files = this.filesService.createFiles(FileType.REQUESTS_ANSWERS_FILES, _files);
        const user = await this.usersService.getById(answerer_id);

        const answer = await this.requestAnswerRepository.create({ ...dto, files });
        await answer.$set('user', user);
        await answer.save();

        await request.$set('answer', answer);
        await request.set('frequent', dto.frequent);
        await request.set('answer_id', answer.id);
        await request.save();
        request.answer = answer;
        return answer;
    }

    async deleteAnswer(id: number) {
        const existing = await this.getById(id);
        if (!existing) {
            throw new BadRequestException({}, 'Ответа не существует');
        }
        this.filesService.removeFiles(existing.files);
        await this.requestAnswerRepository.destroy({ where: { id } });
        return 'Ответ удален';
    }
}
