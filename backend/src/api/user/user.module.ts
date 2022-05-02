import { Module } from '@nestjs/common';
import UserController from './user.controller';
import UserService from './user.service';
import { AuthService } from '../auth/auth.service';
import { JwtModule } from '@nestjs/jwt';
import { IS_PROD } from '../../libs/enum/config';
import { jwtConfig } from '../auth/jwt.config';

@Module({
  imports: [
    JwtModule.register({
      secret: jwtConfig.secret,
      signOptions: {
        expiresIn: IS_PROD ? '60m' : '960h',
      },
    }),
  ],
  controllers: [UserController],
  providers: [UserService, AuthService],
  exports: [],
})
export class UserModule {}
