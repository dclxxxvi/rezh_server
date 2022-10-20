import { Role } from "src/roles/roles.model";

export interface AuthUserDto {
	id: number;
	email: string;
	password: string;
	roles: Role[];
}