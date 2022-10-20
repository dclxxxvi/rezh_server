import { BelongsToMany, Column, DataType, Model, Table } from "sequelize-typescript";
import { Role } from "src/roles/roles.model";
import { UserRoles } from "src/roles/user-roles.model";

interface CreateUserAttrs {
	readonly email: string;
	readonly password: string;
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

	//TODO: Дополнить

	@BelongsToMany(() => Role, () => UserRoles)
	roles: Role[];
}