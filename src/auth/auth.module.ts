import { forwardRef, Module } from '@nestjs/common';
import { JwtModule } from '@nestjs/jwt';
import { UsersModule } from 'src/users/users.module';
import { AuthController } from './auth.controller';
import { AuthService } from './auth.service';
import { RolesGuard } from './roles.guard';

@Module({
	controllers: [AuthController],
	providers: [AuthService, RolesGuard],
	imports: [
		forwardRef(() => UsersModule),
		JwtModule.register({
			secret: process.env.JWT_KEY || 'secret',
			signOptions: { expiresIn: process.env.EXPIRESIN || '30m' },
		  }),
	],
	exports: [
		AuthService,
		JwtModule
	]
})
export class AuthModule {}