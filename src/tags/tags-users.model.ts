import { Column, DataType, ForeignKey, Model, Table } from "sequelize-typescript";
import { Tags } from './tags.model';
import { User } from '../users/users.model';

@Table({tableName: 'tags_users', createdAt: false, updatedAt: false})
export class TagsUsers extends Model<TagsUsers> {

    @Column({type: DataType.INTEGER, unique: true, autoIncrement: true, primaryKey: true})
    id: number;

    @ForeignKey(() => User)
    @Column({type: DataType.INTEGER})
    user_id: number;

    @ForeignKey(() => Tags)
    @Column({type: DataType.INTEGER})
    tag_id: number;
}