import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { User, UserDocument } from '../../schema/user/user.schema';
import { Model } from 'mongoose';
import { UserLoginDto } from '../../../../api/user/dto/user.dto';

@Injectable()
export class UserRepository {
  constructor(@InjectModel(User.name) private userModel: Model<UserDocument>) {}

  async findByName(login: UserLoginDto) {
    const result = await this.userModel.findOne(login);
    if (!result) {
      await new this.userModel(login).save();
      return { result: true };
    } else {
      const data = await this.userModel.findOneAndUpdate(login, {
        $set: { connecting: true },
      });
      return { result: false, userInfo: data };
    }
  }

  async getChatLists() {
    return this.userModel.find();
  }

  async logout(name: UserLoginDto) {
    return this.userModel.findOneAndUpdate(
      { name: name },
      {
        $set: {
          connecting: false,
          updatedAt: new Date(),
        },
      },
    );
  }
}
