import { CreateUserDto } from 'src/users/dto/create-user.dto';
import {
	Body,
	Controller, Get, Post, Req, UseGuards,
} from '@nestjs/common';
import { AuthService } from './auth.service';
import { RolesGuard } from './roles.guard';
import { Roles } from './roles-auth.decorator';
import { IRequest } from '../types/Request';
	
@Controller('auth')
export class AuthController {
	constructor(private authService: AuthService) {}

	@Post('/login')
	async login(@Body() dto: CreateUserDto) {		
		return this.authService.login(dto);
	}

	@Post('/registration')
	async registration(@Body() dto: CreateUserDto) {		
		return this.authService.registration(dto);
	}

	@UseGuards(RolesGuard)
	@Roles('USER', 'ADMIN', 'DEPUTAT')
	@Get('/me')
	async getMe(@Req() req: IRequest) {
		return this.authService.getMe(req.user.id);
	}
}