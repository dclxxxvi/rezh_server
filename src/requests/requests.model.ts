import { BelongsTo, BelongsToMany, Column, DataType, ForeignKey, HasOne, Model, Table } from 'sequelize-typescript';
import { RequestAnswer } from "../requests-answers/requests-answers.model";
import { User } from '../users/users.model';
import { Tags } from '../tags/tags.model';
import { TagsRequests } from '../tags/tags-requests.model';

interface CreateRequestAttrs {
	readonly title: string;
	readonly text: string;
	readonly files: string[];
	readonly user_id: number;
	readonly email: string;
	readonly first_name: string;
	readonly second_name: string;
	readonly father_name: string;
	readonly phone_number: string;
	readonly organization_name: string;
	readonly deputat_id: number;
	readonly frequent: boolean;
	readonly moderated: boolean;
	readonly approved: boolean;
	readonly moderating_text: string;
}

@Table({tableName: 'requests'})
export class Request extends Model<Request, CreateRequestAttrs> {
	@Column({type: DataType.INTEGER, unique: true, allowNull: false, autoIncrement: true, primaryKey: true})
	id: number;

	@Column({type: DataType.STRING, allowNull: false})
	title: string;

	@Column({type: DataType.STRING, allowNull: false})
	text: string;

	@Column({type: DataType.ARRAY(DataType.STRING)})
	files: string[];

	@Column({type: DataType.BOOLEAN})
	frequent: boolean;

	@Column({type: DataType.INTEGER})
	user_id: number;

    @Column({type: DataType.STRING})
	email: string;

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

    @Column({type: DataType.BOOLEAN})
	moderated: boolean;

	@Column({type: DataType.BOOLEAN})
	approved: boolean;

    @Column({type: DataType.STRING})
	moderating_text: string;

	@BelongsTo(() => User)
	deputat: User;

	@ForeignKey(() => User)
	@Column({type: DataType.INTEGER})
	deputat_id: number;

    @HasOne(() => RequestAnswer)
    answer: RequestAnswer;

    @ForeignKey(() => RequestAnswer)
    @Column({type: DataType.INTEGER})
    answer_id: number;

	@BelongsToMany(() => Tags, () => TagsRequests)
	tags: Tags[];
}
