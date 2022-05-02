import { Body, Controller, Get, Post } from '@nestjs/common';
import { UserService } from './user.service';
import { JwtPayload } from '../auth/jwt.config';

@Controller()
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Post('/auth')
  async login(@Body() info: JwtPayload) {
    return await this.userService.login(info);
  }
}
