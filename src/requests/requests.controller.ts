import {
    Body,
    Controller,
    Delete,
    Get,
    Param,
    Patch,
    Post,
    Put,
    Req,
    UploadedFiles,
    UseGuards, UseInterceptors,
} from '@nestjs/common';
import { Roles } from 'src/auth/roles-auth.decorator';
import { RolesGuard } from 'src/auth/roles.guard';
import { RequestsService } from './requests.service';
import { CreateRequestDto } from './dto/create-request.dto';
import { ModerateRequestDto } from './dto/moderate-request.dto';
import { IRequest } from '../types/Request';
import { FilesInterceptor } from '@nestjs/platform-express';
import { RequestsQueryParamsDto } from './dto/requests-query-params.dto';

@Controller('requests')
export class RequestsController {
    constructor(private requestsService: RequestsService) {}

    @Roles('ADMIN', 'DEPUTAT')
    @UseGuards(RolesGuard)
    @Post('/get')
    getAll(@Body() { limit, page, query, order }: RequestsQueryParamsDto) {
        return this.requestsService.getAll(limit, page, query, order);
    }

    @Get('/:id')
    getOne(@Param('id') id: number) {
        return this.requestsService.getById(id);
    }

    @Post()
    @UseGuards(RolesGuard)
    @UseInterceptors(FilesInterceptor('files'))
    create(@Body() dto: CreateRequestDto, @Req() req: IRequest, @UploadedFiles() files: Array<Express.Multer.File>) {
        return this.requestsService.create(dto, req, files);
    }

    @Patch('/:id')
    @UseGuards(RolesGuard)
    @UseInterceptors(FilesInterceptor('files'))
    edit(@Param('id') id: number, @Body() dto: CreateRequestDto, @Req() req: IRequest, @UploadedFiles() files: Array<Express.Multer.File>) {
        return this.requestsService.edit(id, dto, req, files);
    }

    @Delete('/:id')
    delete(@Param('id') id: number) {
        return this.requestsService.delete(id);
    }

    @Roles('ADMIN')
    @UseGuards(RolesGuard)
    @Put('/moderate/:id')
    moderate(@Param('id') id: number, @Body() dto: ModerateRequestDto) {
        return this.requestsService.moderate(id, dto);
    }
}
