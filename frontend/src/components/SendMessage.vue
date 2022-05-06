<template>
  <div>
    <button @click="sendMessage">TEST</button>
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

</style>
