import { Controller, Delete, Patch, Post } from '@nestjs/common';

@Controller('requests/answers')
export class RequestsAnswersController {
    @Post()
    addAnswer() {

    }

    @Patch('/:id')
    editAnswer() {

    }

    @Delete('/:id')
    deleteAnswer() {

    }
}
