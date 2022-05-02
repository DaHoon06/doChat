<template>
  <section id="chat-container">
    <chat-component ></chat-component>
  </section>
</template>

<script lang="ts">
import { Component, Vue } from "vue-property-decorator";
import ChatComponent from "@/components/ChatComponent.vue";

@Component({
  components: {
    ChatComponent
  }
})
export default class ChatList extends Vue {

}
</script>

<style scoped>
#chat-container {
  text-align: center;
  background: white;
  border-radius: 20px;
  box-shadow: 0 1px 1px 1px #c7c7c7;
  width: 25%;
  height: 75vh;
  max-height: 500px;
  position: absolute;
  top: 10%;
  left: 40%;
}


</style>
