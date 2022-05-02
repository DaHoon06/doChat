import { Injectable } from '@nestjs/common';
import { AuthService } from '../auth/auth.service';
import { JwtPayload } from '../auth/jwt.config';

@Injectable()
export class UserService {
  constructor(private readonly authService: AuthService) {}

  async login(info: JwtPayload) {
    return this.authService.createToken(info);
  }
}
