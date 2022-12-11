import { CreateUserDto } from 'src/users/dto/create-user.dto';
import {
	Body,
	Controller, Get, Post, Req, UploadedFile, UseGuards, UseInterceptors,
} from '@nestjs/common';
import { AuthService } from './auth.service';
import { RolesGuard } from './roles.guard';
import { Roles } from './roles-auth.decorator';
import { IRequest } from '../types/Request';
import { AuthUserDto } from './dto/auth-user.dto';
import { FileInterceptor } from '@nestjs/platform-express';
	
@Controller('auth')
export class AuthController {
	constructor(private authService: AuthService) {}

	@Post('/login')
	async login(@Body() dto: AuthUserDto) {
		return this.authService.login(dto);
	}

	@Post('/registration')
	@UseInterceptors(FileInterceptor('avatar'))
	async registration(@Body() dto: CreateUserDto, @UploadedFile() avatar: Express.Multer.File) {
		return this.authService.registration(dto, avatar);
	}
}