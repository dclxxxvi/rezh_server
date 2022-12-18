import { BelongsToMany, Column, DataType, Model, Table } from 'sequelize-typescript';
import { News } from '../news/news.model';
import { TagsNews } from './tags-news.model';
import { Request } from '../requests/requests.model';
import { TagsRequests } from './tags-requests.model';
import { User } from '../users/users.model';
import { TagsUsers } from './tags-users.model';

interface TagsCreationAttrs {
    value: string;
    label: string;
}

@Table({tableName: 'tags'})
export class Tags extends Model<Tags, TagsCreationAttrs> {

    @Column({type: DataType.INTEGER, unique: true, autoIncrement: true, primaryKey: true})
    id: number;

    @Column({type: DataType.STRING, unique: true, allowNull: false})
    value: string;

    @Column({type: DataType.STRING, allowNull: false})
    label: string;

    @BelongsToMany(() => News, () => TagsNews)
    news: News[];

    @BelongsToMany(() => Request, () => TagsRequests)
    requests: Request[];

    @BelongsToMany(() => User, () => TagsUsers)
    user: User[];
}