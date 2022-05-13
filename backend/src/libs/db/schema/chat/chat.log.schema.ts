import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';

@Schema({ collection: 'doChat_log', versionKey: false })
export class ChatLog {
  @Prop()
  chatId: string;

  @Prop()
  clientId: string;

  @Prop()
  nickName: string;

  @Prop()
  content: string;

  @Prop()
  createdAt: Date;
}

export const ChatLogSchema = SchemaFactory.createForClass(ChatLog);
