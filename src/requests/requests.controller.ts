import {
    Body,
    Controller,
    Delete,
    Get,
    Param,
    Patch,
    Post,
    Put,
    Query,
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

@Controller('requests')
export class RequestsController {
    constructor(private requestsService: RequestsService) {}

    @Roles("ADMIN", "DEPUTAT")
	@UseGuards(RolesGuard)
    @Get()
    getAll(@Query() { limit, page, query, order }) {
        return this.requestsService.getAll(limit, page, query, order);
    }

    @Get('/:id')
    getOne(@Param('id') id: number) {
        
    }

    @Post()
    @UseGuards(RolesGuard)
    @UseInterceptors(FilesInterceptor('files[]'))
    create(@Body() dto: CreateRequestDto, @Req() req: IRequest, @UploadedFiles() files: Express.Multer.File[]) {
        return this.requestsService.create(dto, req, files);
    }

    @Patch('/:id')
    edit(@Param('id') id: number, @Body() dto: CreateRequestDto) {

    }

    @Delete('/:id')
    delete(@Param('id') id: number) {

    }

    @Roles('ADMIN')
    @UseGuards(RolesGuard)
    @Put('/operate/:id')
    operate(@Param('id') id: number, dto: ModerateRequestDto) {
        
    }
}
