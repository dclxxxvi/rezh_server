import { BelongsTo, BelongsToMany, Column, DataType, ForeignKey, HasOne, Model, Table } from "sequelize-typescript";
import { Request } from "../requests/requests.model";

interface CreateRequestAnswerAttrs {
	readonly text: string;
	readonly password: string;
	readonly files: string[];
	readonly answerer_id: number;
}

@Table({tableName: 'answers'})
export class RequestAnswer extends Model<RequestAnswer, CreateRequestAnswerAttrs> {
	@Column({type: DataType.INTEGER, unique: true, allowNull: false, autoIncrement: true, primaryKey: true})
	id: number;

	@Column({type: DataType.TEXT, allowNull: false})
	text: string;

	@Column({type: DataType.ARRAY(DataType.STRING)})
	files: string[];

	@Column({type: DataType.INTEGER})
	answerer_id: number;

    @BelongsTo(() => Request)
    request: Request;

    @ForeignKey(() => Request)
    @Column({type: DataType.INTEGER})
    request_id: number;
}
