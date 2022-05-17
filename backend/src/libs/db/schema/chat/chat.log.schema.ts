import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import mongoose from 'mongoose';

@Schema({ collection: 'doChat_log', versionKey: false })
export class ChatLog {
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
}

export const ChatLogSchema = SchemaFactory.createForClass(ChatLog);
