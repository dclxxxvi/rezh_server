import { CreateNewsDto } from './dto/create-news.dto';
import {
    Body,
    Controller,
    Delete,
    Get,
    HttpStatus,
    Param,
    ParseFilePipeBuilder,
    Post,
    Put,
    Req,
    UploadedFile,
    UseGuards,
    UseInterceptors,
} from '@nestjs/common';
import { Roles } from 'src/auth/roles-auth.decorator';
import { RolesGuard } from 'src/auth/roles.guard';
import { NewsService } from './news.service';
import { IRequest } from 'src/types/Request';
import { FileInterceptor } from '@nestjs/platform-express';
import { NewsQueryParamsDto } from './dto/news-query-params.dto';

@Controller('news')
export class NewsController {
    constructor(private newsService: NewsService) {}

    @Post()
    @Roles('USER')
    @UseGuards(RolesGuard)
    @UseInterceptors(FileInterceptor('image'))
    create(
        @Body() dto: CreateNewsDto,
        @Req() req: IRequest,
        @UploadedFile(
            new ParseFilePipeBuilder()
                // .addMaxSizeValidator({maxSize: 4000})
                .addFileTypeValidator({ fileType: 'image' })
                .build({
                    errorHttpStatusCode: HttpStatus.UNPROCESSABLE_ENTITY,
                }),
        ) image: Express.Multer.File,
    ) {
        return this.newsService.create(dto, image, req.user.id);
    }

    @Post('/get')
    getAll(@Body() { query, page, order, limit }: NewsQueryParamsDto) {
        return this.newsService.getAll(limit, page, query, order);
    }

    @Get(':id')
    getById(@Param('id') id: number) {
        return this.newsService.getById(id);
    }

    @Delete(':id')
    delete(@Param('id') id: number) {
        return this.newsService.delete(id);
    }

    @Roles('USER')
    @UseGuards(RolesGuard)
    @UseInterceptors(FileInterceptor('image'))
    @Put(':id')
    update(
        @Req() req: IRequest,
        @Param('id') id: number,
        @Body() dto: CreateNewsDto,
        @UploadedFile(
            new ParseFilePipeBuilder()
                // .addMaxSizeValidator({maxSize: 4000})
                .addFileTypeValidator({ fileType: 'image' })
                .build({
                    errorHttpStatusCode: HttpStatus.UNPROCESSABLE_ENTITY,
                }),
        ) image: Express.Multer.File,
    ) {
        return this.newsService.update(id, dto, image, req.user.id);
    }
}
