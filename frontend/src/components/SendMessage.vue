<template>
  <div id="chat-room-wrapper">
    <div id="message-textarea">

      <p class="notice-msg">{{this.notice}}</p>

      <section class="user1-wrapper" >
        <article class="user1-container" v-for="(contents, index) of this.textAreaArr2" :key="index">
          <main class="chat-main-section-you">
            <span class="user1">{{ contents.name }}</span>
            <h5 class="user1-text">{{ contents.message }}</h5>
          </main>
        </article>

        <article class="user2-container" v-for="(contents, index) of this.textAreaArr1" :key="index">
          <main class="chat-main-section-my">
            <h5 class="user2-text">{{ contents.message }}</h5>
            <span class="user2">{{ contents.name }}</span>
          </main>
        </article>
      </section>


    </div>
    <div id="message-input-area">
      <input type="text" id="message-input" v-model="message" @keyup.enter='sendMessage' placeholder="메세지를 입력해 주세요." />
      <button id="send-message-btn" @click="sendMessage" >Send</button>
    </div>

  </div>
</template>

<script lang="ts">
import { Component, Vue } from "vue-property-decorator";

export interface ChatInformation {
  name: string;
  message?: string;
}

@Component
export default class SendMessage extends Vue {
  message = '';
  textarea = '';
  textAreaArr1: ChatInformation[];
  textAreaArr2: ChatInformation[];

  myName = '';
  targetName = '';
  roomName = '';

  notice = '';

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
    this.textAreaArr1 = []
    this.textAreaArr2 = [];
  }

  created() {
    this.connectSocket();
  }

  private connectSocket() {
    // 채팅방 조회
    this.getChatList();
  }
  private getChatList() {
    this.$socket.emit('getChatRoomList', null);
    this.$socket.on('getChatRoomList', (data) => {
      this.$socket.emit('enterChatRoom', data);
      this.$socket.on('enterChatRoom',(data) => {
        alert(data)
        this.notice = data;
      })
    });

  }

  private sendMessage() {
    const sendData = {
      message: this.message,
      nickName: this.getName,
    }
    this.$socket.emit('sendMessage', sendData);
    this.message = '';
    this.getMessage();

  }

  private getMessage() {
    this.$socket.on('getMessage', (data) => {
      const { nickName, message } = data;
      this.textarea = message;
      this.textAreaArr1.push(data.message);
      this.setChatInformation(nickName, message);
    });
  }

  private setChatInformation(nickName: string, message: string) {
    if (nickName === this.getName) {
      this.myName = nickName
      this.textAreaArr1.push({name: nickName, message: message});
    } else if (nickName) {
      this.targetName = nickName
      this.textAreaArr2.push({name: nickName, message: message});
    }

  }

  mounted() {
    this.getMessage();
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

.user1, .user2 {
  display: inline-block;
  border: 1px solid #afafaf;
  border-radius: 45px;
  width: 40px;
  height: 40px;
}
.user1-wrapper {
  display: flex;
  justify-content: flex-start;
  margin-top: 0.7em;
}
.user1-container {
  box-shadow: 0 1px 1px 1px #b7b7b7;
  border: 1px solid #afafaf;
  color: #313131;
  background: #d3d3f8;
  font-weight: 500;
  border-radius: 10px;
  display: flex;
  align-items: center;
  justify-content: flex-start;
  width: 15em;
  margin-left: 1em;
  padding-left: 0.5em;
}
.user2-wrapper  {
  display: flex;
  justify-content: flex-end;
  margin-top: 0.7em;
}
.user2-container {
  box-shadow: 0 1px 1px 1px #b7b7b7;
  border: 1px solid #afafaf;
  position: relative;
  top: 2em;
  color: #313131;
  background: #d3d3f8;
  border-radius: 10px;
  display: flex;
  align-items: center;
  justify-content: flex-end;
  width: 15em;
  margin-right: 1em;
  padding-right: 0.5em;
}
.user1-text {
  padding-right: 0.5em;
}
.user2-text {
  padding-left: 0.5em;
}
.chat-main-section-you, .chat-main-section-my {
  width: 100%;
  display: flex;
  align-items: center;
}
.chat-main-section-you {
  justify-content: flex-start;
}
.chat-main-section-you > h5 {
  margin-left: 0.5em;
}
.chat-main-section-my {
  justify-content: flex-end;
}
.chat-main-section-my > h5 {
  margin-right: 0.5em;
}

.notice-msg {
  font-weight: 500;
  color: #9d9da2;
  font-size: 0.85em;
}
</style>
