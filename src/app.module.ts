import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { SequelizeModule } from '@nestjs/sequelize';
import * as path from 'path';
import { ServeStaticModule } from '../node_modules/@nestjs/serve-static'
import { UsersModule } from './users/users.module';
import { AuthModule } from './auth/auth.module';
import { User } from './users/users.model';
import { RolesModule } from './roles/roles.module';
import { Role } from './roles/roles.model';
import { UserRoles } from './roles/user-roles.model';
import { NewsModule } from './news/news.module';
import { News } from './news/news.model';
import { FilesModule } from './files/files.module';

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
			models: [User, Role, UserRoles, News],
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
	],
})
export class AppModule {}
