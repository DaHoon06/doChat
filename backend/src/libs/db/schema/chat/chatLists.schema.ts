import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import mongoose, { Document } from 'mongoose';

export type ChatDocument = ChatLists & Document;

@Schema({ collection: 'doChat_list', versionKey: false })
export class ChatLists {
  @Prop({ type: mongoose.Types.ObjectId })
  chatId: string;

  @Prop()
  clientId: string;

  @Prop()
  nickName: string;

  @Prop()
  content: string;

  @Prop({ required: true, default: new Date() })
  createdAt: Date;

  @Prop({ required: true, default: false })
  isDelete: boolean;
}

export const ChatListsSchema = SchemaFactory.createForClass(ChatLists);
