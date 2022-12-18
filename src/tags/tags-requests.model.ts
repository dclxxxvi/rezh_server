import { Column, DataType, ForeignKey, Model, Table } from "sequelize-typescript";
import { Request } from '../requests/requests.model';
import { Tags } from './tags.model';

@Table({tableName: 'tags_requests', createdAt: false, updatedAt: false})
export class TagsRequests extends Model<TagsRequests> {

    @Column({type: DataType.INTEGER, unique: true, autoIncrement: true, primaryKey: true})
    id: number;

    @ForeignKey(() => Request)
    @Column({type: DataType.INTEGER})
    request_id: number;

    @ForeignKey(() => Tags)
    @Column({type: DataType.INTEGER})
    tag_id: number;
}