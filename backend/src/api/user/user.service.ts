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
    const result = await this.findByName(login);
    return this.authService.createToken(login);
  }

  async validationToken(token: string) {
    return this.authService.decodeToken(token);
  }

  async findByName(login: JwtPayload) {
    await this.userRepository.findByName(login);
  }

  async getChatLists() {
    return await this.userRepository.getChatLists();
  }

  async logout(name: JwtPayload) {
    await this.userRepository.logout(name);
  }
}
