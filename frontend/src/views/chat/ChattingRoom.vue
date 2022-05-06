<template>
  <main id="chat-room-container">
    <navigation-component />
    <send-message />
  </main>
</template>

<script lang="ts">
import { Component, Vue } from "vue-property-decorator";
import NavigationComponent from "@/components/common/NavigationComponent.vue";
import SendMessage from "@/components/SendMessage.vue";

@Component({
  components: {
    SendMessage,
    NavigationComponent,
  }
})
export default class ChattingRoom extends Vue {
  created() {
    console.log('TEST');
  }
}
</script>

<style scoped>
#chat-room-container {
  text-align: center;
  background: white;
  border-radius: 20px;
  box-shadow: 0 1px 1px 1px #c7c7c7;
  width: 90%;
  height: 75vh;
  max-height: 500px;
  position: absolute;
  top: 10%;
  left: 1.9em;
}
</style>
