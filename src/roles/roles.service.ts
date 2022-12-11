import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import { CreateRoleDto } from './dto/create-role.dto';
import { Role } from './roles.model';

@Injectable()

export class RolesService {
	constructor(@InjectModel(Role) private roleRepository: typeof Role) {}

    async createRole(dto: CreateRoleDto) {
        const role = await this.roleRepository.create(dto);
        return role;
    }

    async getRoleByValue(value: string) {
        const role = await this.roleRepository.findOne({where: {value}});
        return role;
    }

	async getAllRoles() {
		const roles = await this.roleRepository.findAll();
		return roles;
	}

	async deleteRoleByValue(value: string) {
		const role = await this.roleRepository.destroy({where: {value}});
		return `Роль ${value} успешно удалена`;
	}

	async configureRoles() {
		await this.createRole({value: 'USER', description: 'Пользователь'});
		await this.createRole({value: 'DEPUTAT', description: 'Депутат'});
		await this.createRole({value: 'ADMIN', description: 'Администратор'});
	}
}
