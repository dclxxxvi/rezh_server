import { IsEmail, IsNotEmpty, IsString } from "class-validator";


export class CreateUserDto {
	@IsEmail({}, {message: 'Некорректный email'})
	readonly email: string;

	@IsString({message: 'Поле должно быть строкой'})
	@IsNotEmpty({message: 'Поле не должно быть пустым'})
	readonly password: string;
	readonly avatar: string;
	readonly first_name: string;
	readonly second_name: string;
	readonly father_name: string;
	readonly phone_number: string;
	readonly organization_name: string;
}