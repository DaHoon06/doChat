import { Injectable } from '@nestjs/common';
import { AuthService } from '../auth/auth.service';
import { JwtPayload } from '../auth/jwt.config';
import { UserRepository } from './user.repository';
import { UserLoginDto } from "./dto/user.dto";

@Injectable()
export class UserService {
  constructor(
    private readonly authService: AuthService,
    private readonly userRepository: UserRepository,
  ) {}

  async login(login: UserLoginDto) {
    await this.findByName(login);
    return this.authService.createToken(login);
  }

  async validationToken(token: string) {
    return this.authService.decodeToken(token);
  }

  async findByName(login: UserLoginDto) {
    return await this.userRepository.findByName(login);
  }

  async getChatLists() {
    return await this.userRepository.getChatLists();
  }

  async logout(name: UserLoginDto) {
    await this.userRepository.logout(name);
  }
}
