import { Body, Controller, Delete, Get, Param, Post, UseGuards } from '@nestjs/common';
import { Roles } from 'src/auth/roles-auth.decorator';
import { RolesGuard } from 'src/auth/roles.guard';
import { CreateRoleDto } from './dto/create-role.dto';
import { RolesService } from './roles.service';

@Controller('roles')
export class RolesController {
	constructor(private rolesService: RolesService) {}

    @Post()
    create(@Body() dto: CreateRoleDto) {
        return this.rolesService.createRole(dto);
    }

    @Get('/:value')
    getByValue(@Param('value') value: string) {
        return this.rolesService.getRoleByValue(value);
    }

	@Get()
	getAll() {
		return this.rolesService.getAllRoles();
	}

	@Delete('/:value')
	deleteByValue(@Param('value') value: string) {
		return this.rolesService.deleteRoleByValue(value);
	}

	@Post('/configure_roles')
	configureRoles() {
		return this.rolesService.configureRoles();
	}
}
