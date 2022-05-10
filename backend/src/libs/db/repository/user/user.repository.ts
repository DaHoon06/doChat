import { Injectable } from '@nestjs/common';
import { JwtPayload } from '../../../../api/auth/jwt.config';
import { InjectModel } from '@nestjs/mongoose';
import { User, UserDocument } from '../../schema/user/user.schema';
import { Model } from 'mongoose';

@Injectable()
export class UserRepository {
  constructor(@InjectModel(User.name) private userModel: Model<UserDocument>) {}

  async findByName(login: JwtPayload) {
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

  async logout(name: JwtPayload) {
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
