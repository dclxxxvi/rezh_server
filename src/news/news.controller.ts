import { CreateNewsDto } from './dto/create-news.dto';
import { Body, Controller, FileTypeValidator, Get, HttpStatus, MaxFileSizeValidator, ParseFilePipe, ParseFilePipeBuilder, Post, Req, UploadedFile, UseGuards, UseInterceptors } from '@nestjs/common';
import { Request } from 'express';
import { Roles } from 'src/auth/roles-auth.decorator';
import { RolesGuard } from 'src/auth/roles.guard';
import { NewsService } from './news.service';
import { IRequest } from 'src/types/Request';
import { FileInterceptor } from '@nestjs/platform-express';

@Controller('news')
export class NewsController {
    constructor(private newsService: NewsService) {}

    @Post()
    @Roles("USER")
	@UseGuards(RolesGuard)
    @UseInterceptors(FileInterceptor('image'))
    create(
        @Body() dto: CreateNewsDto, 
        @Req() req: IRequest, 
        @UploadedFile(
            new ParseFilePipeBuilder()
                // .addMaxSizeValidator({maxSize: 4000})
                .addFileTypeValidator({fileType: 'image'})
                .build({
                    errorHttpStatusCode: HttpStatus.UNPROCESSABLE_ENTITY
                }),
         ) image: Express.Multer.File
    ) {
        return this.newsService.create(dto, image, req.user.id);
    }

    @Get()
    getAll() {
        return this.newsService.getAll();
    }
}
