<template>
  <div id="chat-room-wrapper">

    <div id="message-textarea">
      <p>{{ this.targetName }} 님의 진실의 방으로</p>
      메세지 영역
      <p>{{ this.targetName }} 님의 진실의 방으로</p>

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
  message = '';
  textarea = '';
  targetName = this.$route.params.name;

  created() {
    this.getUserInfo();
    this.$socket.on('chat', (data: any) => {
      this.textarea += data.message + "\n";
    });
  }

  private async getUserInfo() {
    const { data } = await this.axios.get('/chat/do',
      { params: {
          name: this.targetName
        }});
    console.log(data);
  }

  private sendMessage() {

    this.$socket.emit('chat', {
      message: this.message
    });
    this.textarea += this.message + "\n";
    this.message = '';
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
