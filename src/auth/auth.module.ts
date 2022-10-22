import { forwardRef, Global, Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { JwtModule } from '@nestjs/jwt';
import { UsersModule } from 'src/users/users.module';
import { AuthController } from './auth.controller';
import { AuthService } from './auth.service';
import { RolesGuard } from './roles.guard';

@Global()
@Module({
	controllers: [AuthController],
	providers: [AuthService, RolesGuard],
	imports: [
		forwardRef(() => UsersModule),
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
		AuthService,
		JwtModule
	]
})
export class AuthModule {}