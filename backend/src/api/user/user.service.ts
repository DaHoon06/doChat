import { Injectable } from '@nestjs/common';
import { AuthService } from '../auth/auth.service';
import { JwtPayload } from '../auth/jwt.config';
import { UserRepository } from '../../libs/db/repository/user/user.repository';

@Injectable()
export class UserService {
  constructor(
    private readonly authService: AuthService,
    private readonly userRepository: UserRepository,
  ) {}

  async login(login: JwtPayload) {
    const result = await this.findByNickName(login);
    console.log(result);
    return this.authService.createToken(login);
  }

  async validationToken(token: string) {
    return this.authService.decodeToken(token);
  }

  async findByNickName(login: JwtPayload) {
    await this.userRepository.findByName(login);
  }

  async getChatLists() {
    return await this.userRepository.getChatLists();
  }
}
