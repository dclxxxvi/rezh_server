import { Module } from '@nestjs/common';
import { SequelizeModule } from '@nestjs/sequelize';
import { Role } from 'src/roles/roles.model';
import { RolesModule } from 'src/roles/roles.module';
import { UserRoles } from 'src/roles/user-roles.model';
import { UsersController } from './users.controller';
import { User } from './users.model';
import { UsersService } from './users.service';
import { FilesModule } from '../files/files.module';
import { TagsUsers } from '../tags/tags-users.model';
import { Tags } from '../tags/tags.model';

@Module({
    controllers: [UsersController],
    providers: [UsersService],
    exports: [UsersService],
    imports: [
        SequelizeModule.forFeature([User, Role, UserRoles, Tags, TagsUsers]),
        RolesModule,
        FilesModule,
    ],
})

export class UsersModule {}
