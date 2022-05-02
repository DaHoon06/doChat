import { Controller, Post } from '@nestjs/common';
import UserService from './user.service';
import { JwtPayload } from '../auth/jwt.config';

@Controller()
export default class UserController {
  constructor(private readonly userService: UserService) {}

  @Post()
  async login(info: JwtPayload) {
    await this.userService.login(info);
  }
}
