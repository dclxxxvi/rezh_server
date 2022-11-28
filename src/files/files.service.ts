import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import * as path from 'path';
import * as uuid from 'uuid';
import * as fs from 'fs';

export enum FileType {
    REQUESTS_FILES = 'requests/files',
    NEWS_IMAGE = 'news/images',
    REQUESTS_ANSWERS_FILES = 'requests/answers/files'
}

@Injectable()
export class FilesService {
    createFile(type: FileType, file: Express.Multer.File) {
        try {
            const fileExtension = file.originalname.split('.').pop();
            const fileName = `${ uuid.v4() }.${ fileExtension }`;
            const filePath = path.resolve(__dirname, '..', 'static', type);
            if (!fs.existsSync(filePath)) {
                fs.mkdirSync(filePath, { recursive: true });
            }
            fs.writeFileSync(path.resolve(filePath, fileName), file.buffer);
            return type + '/' + fileName;
        } catch (e) {
            throw new HttpException(
                e.message,
                HttpStatus.INTERNAL_SERVER_ERROR,
            );
        }
    }

    createFiles(type: FileType, files: Express.Multer.File[]) {
        try {
            return files
                .map(file => this.createFile(type, file));
        } catch (e) {
            throw new HttpException(
                e.message,
                HttpStatus.INTERNAL_SERVER_ERROR,
            );
        }

    }

    removeFile(fileName: string) {
        try {
            const filePath = path.resolve(__dirname, '..', 'static', fileName);
            if (fs.existsSync(filePath)) {
                fs.unlinkSync(filePath);
            }
        } catch (e) {
            throw new HttpException(
                e.message,
                HttpStatus.INTERNAL_SERVER_ERROR,
            );
        }
    }

    removeFiles(fileNames: string[]) {
        try {
            fileNames.forEach(fileName => this.removeFile(fileName));
        } catch (e) {
            throw new HttpException(
                e.message,
                HttpStatus.INTERNAL_SERVER_ERROR,
            );
        }
    }
}
