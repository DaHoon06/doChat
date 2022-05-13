export class CommonChatDto {
  roomId: string;
  nickName?: string;
}

export class chatRoomListDTO extends CommonChatDto {
  roomName: string;
}
