<template>
  <div>
    <div>
      메세지 영역
    </div>
    <div>
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

  created() {
    this.$socket.on('chat', (data: any) => {
      this.textarea += data.message + "\n";
    });
  }

  private sendMessage() {
    console.log('TEST')
    this.$socket.emit('chat', {
      message: this.message
    });
    this.textarea += this.message + "\n";
    this.message = '';
  }
}
</script>

<style scoped>
#message-input {
  border: 1px solid #afafaf;
  color: #626262;
  font-weight: 500;
  border-radius: 10px;
  padding-left: 5px;
  width: 95%;
  height: 2em;
  outline: none;
  background: none;
}
#send-message-btn {
  border-left: 1px solid #afafaf;
  position: absolute;
  color: #626262;
  right: 1em;
  margin-top: 0.5em;
}
#send-message-btn:hover {
  cursor: pointer;
}
</style>
