import { IsEmail, IsNotEmpty, IsString } from "class-validator";


export class CreateUserDto {
	@IsEmail({}, {message: 'Некорректный email'})
	readonly email: string;

	@IsString({message: 'Поле должно быть строкой'})
	@IsNotEmpty({message: 'Поле не должно быть пустым'})
	readonly password: string;
}