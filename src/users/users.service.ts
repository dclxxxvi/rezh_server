import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import { Model } from 'sequelize-typescript';
import { CreateUserDto } from './dto/create-user.dto';
import { User } from './users.model';
import { genSalt, hash, compare } from 'bcrypt';
import { RolesService } from 'src/roles/roles.service';
import { AddRoleDto } from './dto/add-role.dto';

@Injectable()
export class UsersService {
	constructor(
		@InjectModel(User) private readonly userRepository: typeof User,
		private readonly rolesService: RolesService,
		) {}

	async getByEmail(email: string): Promise<User> {
		const user = await this.userRepository.findOne({ where: { email }, include: {all: true} });
		return user;
	}

	async getAll(): Promise<User[]> {
		const users = await this.userRepository.findAll();
		return users;
	}

	async getById(id: number): Promise<User> {
		const user = await this.userRepository.findOne({ where: { id }, include: {all: true} });
		return user;
	}

	async create(dto: CreateUserDto): Promise<User> {
		const existedUser = await this.getByEmail(dto.email);
		if (existedUser) {
			throw new HttpException('Пользователь с таким email уже существует', HttpStatus.BAD_REQUEST);
		}
		const role = await this.rolesService.getRoleByValue('USER');
		if (!role) {
			throw new HttpException('Роль USER не определена', HttpStatus.BAD_REQUEST);
		}
		const user = await this.userRepository.create(dto);
		user.$set('roles', [role.id]);
		user.roles = [role];
		return user;
	}

	async deleteById(id: number): Promise<string> {
		await this.userRepository.destroy({where: {id}});
		return `Пользователь c id: ${id} был успешно удален`;
	}

	async addRole(dto: AddRoleDto) {
		const user = await this.userRepository.findByPk(dto.userId);
		const role = await this.rolesService.getRoleByValue(dto.value);
		if (role && user) {
			await user.$add('role', role.id);
			return `Роль ${dto.value} успешно добавлена пользователю с id ${dto.userId}`;
		}
		throw new HttpException('Пользователь или роль не найдены', HttpStatus.NOT_FOUND);
	}
}
