<template>
  <div id="chat-room-wrapper">
    <div id="message-textarea">

      <p class="notice-msg">"TEST" 님이 입장하셨습니다.</p>

      <section class="user1-wrapper">
        <article class="user1-container">
          <main class="chat-main-section">
            <span class="user1"></span>
            <h5 class="user1-text">안녕하세요</h5>
          </main>
        </article>
      </section>


      <section class="user2-wrapper">
        <article class="user2-container">
          <main class="chat-main-section">
            <h5 class="user2-text">안녕하세요</h5>
            <span class="user2"></span>
          </main>
        </article>
      </section>

      <ul>
        <li v-for="(text, index) of this.textAreaArr" :key="index">{{ text }}</li>
      </ul>

<!--      <p>{{ this.testMsg }}</p>-->

      <p class="notice-msg">"TEST" 님이 퇴장하셨습니다.</p>
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

  myName = this.$store.getters['userStore/name'];
  //상대방 이름
  targetName = this.$route.params.name;

  name = '';
  roomName = '';

  testMsg = '';
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
    this.connectSocket();
  }

  private connectSocket() {
    this.$socket.on('connect', () => {
      const nickName = this.myName;
      this.$socket.emit('setInit', { nickName }, (response: any) => {
        this.myInfo.nickName = response.nickName;
        this.myInfo.id = this.$socket.id;
        this.myInfo.room = response.room;
        this.name = this.myInfo.nickName;
        this.roomName = this.myInfo.room.roomName;
      })
    });
    // 채팅방 조회
    this.getChatList();
    this.test();
  }
  private getChatList() {
    this.$socket.emit('getChatRoomList', null);
    this.$socket.on('getChatRoomList', (data) => {
      console.log(data);
    });
  }

  // private test2() {
  //   const nickName = this.myName;
  //   const targetName = this.targetName;
  //   this.$socket.emit('createChatRoom',{ targetName });
  //   this.$socket.emit('enterChatRoom');
  //   this.$socket.on('enterChatRoom',(data) => {
  //     console.log(data.message);
  //   })
  // }
  // private initRoom() {
  //   this.test();
  //   const nickName = this.targetName;
  //   this.$socket.emit('setInit', { nickName }, (response: any) => {
  //     this.myInfo.nickName = response.nickName;
  //     this.myInfo.id = this.$socket.id;
  //     this.myInfo.room = response.room;
  //     this.name = this.myInfo.nickName;
  //     this.roomName = this.myInfo.room.roomName;
  //   })
  // }

  private sendMessage() {
    this.$socket.emit('sendMessage', this.message);
    this.getMessage();
    this.message = '';
  }

  private getMessage() {
    this.$socket.on('sendMessage', (data) => {
      this.textarea = data.message;
      this.textAreaArr.push(this.textarea);
    });
  }

  private test() {
    console.log('TEST')
    this.$socket.on('getMessage', (data) => {
      console.log(data.message)
      this.testMsg = data.message;
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
}
.user2-container {
  box-shadow: 0 1px 1px 1px #b7b7b7;
  border: 1px solid #afafaf;
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

.chat-main-section {
  width: 100%;
  display: flex;
  justify-content: space-between;
  align-items: center;
}

.notice-msg {
  font-weight: 500;
  color: #9d9da2;
  font-size: 0.85em;
}
</style>
