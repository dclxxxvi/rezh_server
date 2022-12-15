import { BelongsToMany, Column, DataType, HasMany, Model, Table } from 'sequelize-typescript';
import { Role } from "src/roles/roles.model";
import { UserRoles } from "src/roles/user-roles.model";
import { RequestAnswer } from '../requests-answers/requests-answers.model';
import { Request } from '../requests/requests.model';

interface CreateUserAttrs {
	readonly email: string;
	readonly password: string;
	readonly avatar: string;
	readonly first_name: string;
	readonly second_name: string;
	readonly father_name: string;
	readonly phone_number: string;
	readonly organization_name: string;
	readonly description: string;
}

@Table({tableName: 'users'})
export class User extends Model<User, CreateUserAttrs> {
	@Column({type: DataType.INTEGER, unique: true, allowNull: false, autoIncrement: true, primaryKey: true})
	id: number;

	@Column({type: DataType.STRING, unique: true, allowNull: false})
	email: string;

	@Column({type: DataType.STRING, allowNull: false})
	password: string;

	@Column({type: DataType.STRING})
	first_name: string;

	@Column({type: DataType.STRING})
	second_name: string;

	@Column({type: DataType.STRING})
	father_name: string;

	@Column({type: DataType.STRING})
	phone_number: string;

	@Column({type: DataType.STRING})
	organization_name: string;

	@Column({type: DataType.STRING})
	description: string;

	@Column({type: DataType.STRING})
	avatar: string;

	@BelongsToMany(() => Role, () => UserRoles)
	roles: Role[];

	@HasMany(() => RequestAnswer)
	answers: RequestAnswer[];

	@HasMany(() => Request)
	requests: Request[];
}
