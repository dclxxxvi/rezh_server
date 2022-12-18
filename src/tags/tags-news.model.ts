import { Column, DataType, ForeignKey, Model, Table } from "sequelize-typescript";
import { Tags } from './tags.model';
import { News } from '../news/news.model';

@Table({tableName: 'tags_news', createdAt: false, updatedAt: false})
export class TagsNews extends Model<TagsNews> {

    @Column({type: DataType.INTEGER, unique: true, autoIncrement: true, primaryKey: true})
    id: number;

    @ForeignKey(() => News)
    @Column({type: DataType.INTEGER})
    news_id: number;

    @ForeignKey(() => Tags)
    @Column({type: DataType.INTEGER})
    tag_id: number;
}