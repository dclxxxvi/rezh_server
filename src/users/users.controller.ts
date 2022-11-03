import { Body, Controller, Delete, Get, Param, Post, Req, UseGuards } from '@nestjs/common';
import { Roles } from 'src/auth/roles-auth.decorator';
import { RolesGuard } from 'src/auth/roles.guard';
import { IRequest } from 'src/types/Request';
import { AddRoleDto } from './dto/add-role.dto';
import { CreateUserDto } from './dto/create-user.dto';
import { UsersService } from './users.service';

@Controller('users')
export class UsersController {
	constructor(private userService: UsersService) {}

	@Get() 
	getAll() {
		return this.userService.getAll();
	}

    @Get('/me')
    @Roles('USER')
    @UseGuards(RolesGuard)
    getMe(@Req() req: IRequest) {
        return this.userService.getById(req.user.id);
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

	@Post('/role')
	addRole(@Body() dto: AddRoleDto) {
		return this.userService.addRole(dto);
	}
}
