import { Body, Controller, Get, Param, Patch, Post } from '@nestjs/common';
import { UserService } from './user.service';
import { JwtPayload } from '../auth/jwt.config';
import { UserLoginDto } from './dto/user.dto';

@Controller()
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Post('/auth')
  async login(@Body() name: any) {
    return await this.userService.login(name);
  }

  @Post('/auth/:token')
  async validationToken(@Param('token') token: string) {
    return await this.userService.validationToken(token);
  }

  @Get('/chatLists')
  async getChatLists() {
    return await this.userService.getChatLists();
  }

  @Patch('/logout')
  async logout(@Body('name') name: UserLoginDto) {
    return await this.userService.logout(name);
  }
}
