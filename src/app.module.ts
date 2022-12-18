import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { SequelizeModule } from '@nestjs/sequelize';
import * as path from 'path';
import { ServeStaticModule } from '@nestjs/serve-static'
import { UsersModule } from './users/users.module';
import { AuthModule } from './auth/auth.module';
import { User } from './users/users.model';
import { RolesModule } from './roles/roles.module';
import { Role } from './roles/roles.model';
import { UserRoles } from './roles/user-roles.model';
import { NewsModule } from './news/news.module';
import { News } from './news/news.model';
import { FilesModule } from './files/files.module';
import { RequestsModule } from './requests/requests.module';
import { RequestsAnswersModule } from './requests-answers/requests-answers.module';
import { RequestAnswer } from './requests-answers/requests-answers.model';
import { Request } from './requests/requests.model';
import { TagsController } from './tags/tags.controller';
import { TagsService } from './tags/tags.service';
import { TagsModule } from './tags/tags.module';
import { Tags } from './tags/tags.model';
import { TagsUsers } from './tags/tags-users.model';
import { TagsNews } from './tags/tags-news.model';
import { TagsRequests } from './tags/tags-requests.model';

@Module({
	imports: [
		ConfigModule.forRoot({
			envFilePath: `.${process.env.NODE_ENV}.env`,
			isGlobal: true,
		}),
		SequelizeModule.forRoot({
			dialect: 'postgres',
			host: process.env.POSTGRES_HOST,
			port: Number(process.env.POSTGRES_PORT),
			username: process.env.POSTGRES_USER,
			password: process.env.POSTGRES_PASSWORD,
			database: process.env.POSTGRES_DB,
			models: [User, Role, UserRoles, News, Request, RequestAnswer, Tags, TagsUsers, TagsNews, TagsRequests],
			autoLoadModels: true,
		}),
		ServeStaticModule.forRoot({
			rootPath: path.resolve(__dirname, 'static')
		}),
		UsersModule,
		AuthModule,
		RolesModule,
		NewsModule,
		FilesModule,
		RequestsModule,
		RequestsAnswersModule,
		TagsModule,
	],
	controllers: [TagsController],
	providers: [TagsService],
})
export class AppModule {}
