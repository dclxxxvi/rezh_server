import {
    Body,
    Controller,
    Delete, Get,
    Param,
    Patch,
    Post,
    Req,
    UploadedFiles,
    UseGuards,
    UseInterceptors,
} from '@nestjs/common';
import { RolesGuard } from '../auth/roles.guard';
import { Roles } from '../auth/roles-auth.decorator';
import { IRequest } from '../types/Request';
import { CreateAnswerDto } from './dto/CreateAnswer.dto';
import { FilesInterceptor } from '@nestjs/platform-express';
import { RequestsAnswersService } from './requests-answers.service';

@Controller('requests_answers')
export class RequestsAnswersController {
    constructor(private requestsAnswersService: RequestsAnswersService) {}

    @Get()
    getAll() {
        return this.requestsAnswersService.getAll();
    }

    @Get('/:id')
    getOne(@Param('id') id: number) {
        return this.requestsAnswersService.getById(id);
    }

    @UseGuards(RolesGuard)
    @Roles('DEPUTAT')
    @UseInterceptors(FilesInterceptor('files'))
    @Post('/:id')
    addAnswer(@Body() dto: CreateAnswerDto, @Param('id') requestId: number, @Req() req: IRequest, @UploadedFiles() files: Express.Multer.File[]) {
        return this.requestsAnswersService.addAnswer(dto, requestId, req.user.id, files);
    }

    @Patch('/:id')
    editAnswer() {

    }

    @UseGuards(RolesGuard)
    @Roles('DEPUTAT')
    @Delete('/:id')
    deleteAnswer(@Param('id') id: number) {
        return this.requestsAnswersService.deleteAnswer(id);
    }
}
