<template>
  <div id="chat-room-wrapper">

    <div id="message-textarea">
      <p> {{this.nameTest}} 진실의 방으로</p>
      <p>{{ this.roomNameTest }}</p>
     <ul>
       <li v-for="(text, index) of this.textAreaArr" :key="index">{{ text }}</li>
     </ul>
    </div>
    <div id="message-input-area">
      <input type="text" id="message-input" v-model="message" placeholder="메세지를 입력해 주세요." />
      <button id="send-message-btn" @click="sendMessage" >Send</button>
    </div>

  </div>
</template>

<script lang="ts">
import { Component, Vue } from "vue-property-decorator";

@Component
export default class SendMessage extends Vue {
  message = '';
  textarea = '';
  textAreaArr: string[];

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
    this.textAreaArr = [];
  }

  created() {
    this.initRoom();
  }

  private initRoom() {
    const nickName = this.targetName;
    this.$socket.emit('setInit', { nickName }, (response: any) => {
      this.myInfo.nickName = response.nickName;
      this.myInfo.id = this.$socket.id;
      this.myInfo.room = response.room;
      this.nameTest = this.myInfo.nickName;
      this.roomNameTest = this.myInfo.room.roomName;
      console.log(this.myInfo)
    })
  }

  private async getUserInfo() {
    const { data } = await this.axios.get('/chat/do',
      { params: {
          name: this.targetName
        }});
    console.log(data);
  }

  private sendMessage() {
    this.$socket.emit('sendMessage', this.message);
    this.$socket.on('getMessage', (data) => {
      this.textarea = data.message;
      this.textAreaArr.push(this.textarea);
    });
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
