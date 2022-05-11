<template>
  <main id="chat-container">
    <navigation-component />
    <chat-component  />
  </main>
</template>

<script lang="ts">
import { Component, Vue } from "vue-property-decorator";
import ChatComponent from "@/components/ChatComponent.vue";
import NavigationComponent from "@/components/common/NavigationComponent.vue";

@Component({
  components: {
    NavigationComponent,
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
  width: 50vw;
  height: 75vh;
  max-height: 500px;
  margin: 5em auto;
  overflow-y: auto;
}


</style>
