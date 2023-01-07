import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import { CreateUserDto } from './dto/create-user.dto';
import { User } from './users.model';
import { RolesService } from 'src/roles/roles.service';
import { AddRoleDto } from './dto/add-role.dto';
import { Role } from '../roles/roles.model';
import { IRequest } from '../types/Request';
import { FilesService, FileType } from '../files/files.service';

@Injectable()
export class UsersService {
    constructor(
        @InjectModel(User) private readonly userRepository: typeof User,
        private readonly rolesService: RolesService,
        private readonly filesService: FilesService,
    ) {}

    async getByEmail(email: string): Promise<User> {
        const user = await this.userRepository.findOne({ where: { email }, include: { model: Role } });
        return user;
    }

    async getAll(): Promise<User[]> {
        const users = await this.userRepository.findAll();
        return users;
    }

    async getDeputats(limit, page, query, order) {
        const offset = (!!page && !!limit) ? (page) * limit : 0;
        const users = await this.userRepository.findAndCountAll({
            limit,
            offset,
            include: [{
                model: Role,
                where: {
                    value: 'DEPUTAT',
                },
            }],
            attributes: { exclude: ['password'] },

        });
        return users;
    }

    async getById(id: number): Promise<User> {
        const user = await this.userRepository.findOne({ where: { id }, include: { model: Role } });
        return user;
    }

    async create(dto: CreateUserDto, _avatar?: Express.Multer.File): Promise<User> {
        const existedUser = await this.getByEmail(dto.email);
        if (existedUser) {
            throw new HttpException('Пользователь с таким email уже существует', HttpStatus.BAD_REQUEST);
        }
        const role = await this.rolesService.getRoleByValue('USER');
        if (!role) {
            throw new HttpException('Роль USER не определена', HttpStatus.BAD_REQUEST);
        }

        if (_avatar && existedUser?.avatar) {
            this.filesService.removeFile(existedUser.avatar);
        }
        const avatar = _avatar
            ? this.filesService.createFile(FileType.AVATARS_IMAGES, _avatar)
            : existedUser?.avatar;

        const user = await this.userRepository.create({ ...dto, avatar });
        user.$set('roles', [role.id]);
        user.roles = [role];
        return user;
    }

    async editProfile(dto: CreateUserDto, req: IRequest, _avatar: Express.Multer.File) {
        const user = await this.getById(req.user.id);
        if (!user) {
            throw new HttpException('Пользователь не найден', HttpStatus.BAD_REQUEST);
        }
        if (_avatar && user.avatar) {
            this.filesService.removeFile(user.avatar);
        }
        const avatar = _avatar
            ? this.filesService.createFile(FileType.AVATARS_IMAGES, _avatar)
            : user.avatar;

        const updated = await this.userRepository
            .update({ ...dto, avatar }, { where: { id: user.id }, returning: true });
        return updated[1][0];
    }

    async deleteById(id: number): Promise<string> {
        await this.userRepository.destroy({ where: { id } });
        return `Пользователь c id: ${ id } был успешно удален`;
    }

    async addRole(dto: AddRoleDto) {
        const user = await this.userRepository.findByPk(dto.userId);
        const role = await this.rolesService.getRoleByValue(dto.value);
        if (role && user) {
            await user.$add('role', role.id);
            return `Роль ${ dto.value } успешно добавлена пользователю с id ${ dto.userId }`;
        }
        throw new HttpException('Пользователь или роль не найдены', HttpStatus.NOT_FOUND);
    }
}
