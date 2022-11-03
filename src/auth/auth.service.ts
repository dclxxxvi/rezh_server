import { CreateUserDto } from 'src/users/dto/create-user.dto';
import { JwtService } from '@nestjs/jwt';
import { HttpException, HttpStatus, Injectable, UnauthorizedException } from '@nestjs/common';
import { UsersService } from 'src/users/users.service';
import { User } from 'src/users/users.model';
import * as bcrypt from 'bcrypt';

@Injectable()
export class AuthService {
	constructor(
		private usersService: UsersService,
		private jwtService: JwtService,
	) {}

	async validateUser(dto: CreateUserDto): Promise<User> {
		const {email, password} = dto;
		const user = await this.usersService.getByEmail(email);
		if (!user) {
			throw new UnauthorizedException({message: 'Такого пользователя не существует'})
		}
		const passwordEquals = await bcrypt.compare(password, user?.password);

		if (!passwordEquals) {
			throw new UnauthorizedException({message: 'Некорректный email или пароль'})
		}
		return user;
	}

	async login(dto: CreateUserDto) {
		const user = await this.validateUser(dto);
		return this.generateToken(user);
	}

	async registration(userDto: CreateUserDto) {
        const candidate = await this.usersService.getByEmail(userDto.email);
        if (candidate) {
            throw new HttpException('Пользователь с таким email уже существует', HttpStatus.BAD_REQUEST);
        }
        const hashPassword = await bcrypt.hash(userDto.password, 5);
        const user = await this.usersService.create({...userDto, password: hashPassword});
        return this.generateToken(user);
    }

	private async generateToken(user: User) {
		const payload = {email: user.email, id: user.id, roles: user.roles};
		return {
			access_token: this.jwtService.sign(payload)
		}
	}
}