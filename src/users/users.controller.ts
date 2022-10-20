import { Body, Controller, Delete, Get, Param, Post } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UsersService } from './users.service';

@Controller('users')
export class UsersController {
	constructor(private userService: UsersService) {}
	@Get() 
	getAll() {
		return this.userService.getAll();
	}

	@Post()
	create(@Body() userDto: CreateUserDto) {
		return this.userService.create(userDto);
	}

	@Delete('/:id')
	deleteById(@Param('id') id: number) {
		return this.userService.deleteById(id);
	}

	@Get('/:id')
	getById(@Param('id') id: number) {
		return this.userService.getById(id);
	}
}
