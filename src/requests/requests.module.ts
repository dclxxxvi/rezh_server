import { Module } from '@nestjs/common';
import { RequestsController } from './requests.controller';
import { RequestsService } from './requests.service';
import { SequelizeModule } from '@nestjs/sequelize';
import { Request } from './requests.model';
import { FilesModule } from '../files/files.module';
import { JwtModule } from '@nestjs/jwt';
import { ConfigModule, ConfigService } from '@nestjs/config';

@Module({
  controllers: [RequestsController],
  providers: [RequestsService],
  imports: [
      SequelizeModule.forFeature([Request]),
      FilesModule,
      JwtModule.registerAsync({
          imports: [ConfigModule],
          useFactory: async (configService: ConfigService) => ({
              secret: configService.get<string>('JWT_KEY'),
              signOptions: { expiresIn: configService.get<string>('EXPIRES_IN') }
          }),
          inject: [ConfigService]
      }),
  ],
    exports: [
        RequestsService,
    ]
})
export class RequestsModule {}
