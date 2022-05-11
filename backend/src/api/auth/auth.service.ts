import { Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { JwtPayload } from './jwt.config';
import { jwtConfig } from './jwt.config';
import { UserLoginDto } from "../user/dto/user.dto";
@Injectable()
export class AuthService {
  constructor(private readonly jwtService: JwtService) {}

  async decodeToken(token: string): Promise<any> {
    return this.jwtService.verify(token, { secret: jwtConfig.secret });
    // return this.jwtService.decode(token.replace('Bearer', '').trim());
  }

  createToken(data: UserLoginDto) {
    const { name } = data;
    const payload = {
      name,
    };
    const token = this.jwtService.sign(payload);
    return {
      name: name,
      token: token,
    };
  }

}
