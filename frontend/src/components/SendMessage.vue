<template>
  <div id="chat-room-wrapper">

    <div id="message-textarea">
      <p> {{this.nameTest}} 님의 진실의 방으로</p>
      {{ this.roomNameTest }}
    </div>
    <div id="message-input-area">
      <input type="text" id="message-input" placeholder="메세지를 입력해 주세요." />
      <button id="send-message-btn" @click="sendMessage">Send</button>
    </div>

  </div>
</template>

<script lang="ts">
import { Component, Vue } from "vue-property-decorator";

@Component
export default class SendMessage extends Vue {
  messageTest = '';
  textarea = '';
  targetName = this.$route.params.name;

  nameTest = '';
  roomNameTest = '';

  myInfo: {
    nickName: string,
    id: string,
    room: {
      roomName: string
    },
  }

  constructor() {
    super();
    this.myInfo = {
      nickName: '',
      id: '',
      room: {
        roomName: '',
      },
    }
  }

  async created() {
    this.initRoom();
    // this.getUserInfo();
    this.$socket.on('chat', (data: any) => {
      this.textarea += data.message + "\n";
    });
  }

  private initRoom() {
    this.$socket.on('connect', () => {
      console.log('ChatRoom Connected!!!');
      const nickName = localStorage.getItem('nickName');
      this.$socket.emit('setInit', { nickName }, (response: any) => {
        this.myInfo.nickName = response.nickName;
        this.myInfo.id = this.$socket.id;
        this.myInfo.room = response.room;
        this.nameTest = this.myInfo.nickName;
        this.roomNameTest = this.myInfo.room.roomName;
      })
    });
    this.$socket.emit('getChatRoomList', null);
    this.sendMessage();
  }

  private async getUserInfo() {
    const { data } = await this.axios.get('/chat/do',
      { params: {
          name: this.targetName
        }});
    console.log(data);
  }

  private sendMessage() {

    this.$socket.on('getMessage', ({ id, nickName, message }: { id: string, nickName: string, message: string }) => {
      console.log({ id, nickName, message })
    });

    // this.$socket.connect();
    //
    // this.$socket.emit('message', {
    //   message: this.message
    // });
    // this.textarea += this.message + "\n";
    // this.message = '';
  }
}
</script>

<style scoped>
#chat-room-wrapper {
  overflow-y: auto;
  height: 80%;
}
#message-input {
  z-index: 5;
  background: #cfcff4;
  bottom: 9.5em;
  left: 3em;
  position: fixed;
  padding-right: 4em;
  border: 1px solid #afafaf;
  color: #626262;
  font-weight: 500;
  border-radius: 10px;
  padding-left: 5px;
  width: 77%;
  height: 2em;
  outline: none;
  background: none;
}
#send-message-btn {
  z-index: 10;
  border-left: 1px solid #afafaf;
  position: fixed;
  color: #626262;
  bottom: 10em;
  right: 3.5em;
}
#send-message-btn:hover {
  cursor: pointer;
  background: #cfcff4;
}
#message-input-area {
  height: 20%;
}
#message-textarea {

}
</style>
