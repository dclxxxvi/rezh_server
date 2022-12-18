import { BelongsToMany, Column, DataType, Model, Table } from "sequelize-typescript";
import { Tags } from '../tags/tags.model';
import { TagsNews } from '../tags/tags-news.model';

interface NewsCreationAttrs {
	title: string;
	content: string;
    created_by: number;
    image: string;
}

@Table({tableName: 'news'})
export class News extends Model<News, NewsCreationAttrs> {

	@Column({type: DataType.INTEGER, unique: true, autoIncrement: true, primaryKey: true})
    id: number;

    @Column({type: DataType.STRING, allowNull: false})
    title: string;

    @Column({type: DataType.STRING})
    subtitle: string;

    @Column({type: DataType.STRING, allowNull: false})
    content: string;

    @Column({type: DataType.STRING})
    image: string;

    @Column({type: DataType.INTEGER, allowNull: false})
    created_by: number;

    @BelongsToMany(() => Tags, () => TagsNews)
    tags: Tags[];
}