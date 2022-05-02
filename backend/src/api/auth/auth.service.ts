import { Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { JwtPayload } from './jwt.config';
import { jwtConfig } from './jwt.config';
@Injectable()
export class AuthService {
  constructor(private readonly jwtService: JwtService) {}

  async decodeToken(token: string): Promise<any> {
    return this.jwtService.verify(token, { secret: jwtConfig.secret });
    // return this.jwtService.decode(token.replace('Bearer', '').trim());
  }

  createToken(data: JwtPayload) {
    const { nickName } = data;
    const payload = {
      nickName,
    };
    const token = this.jwtService.sign(payload);
    return {
      nickName: nickName,
      token: token,
    };
  }
}
