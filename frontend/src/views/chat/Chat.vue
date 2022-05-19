<template>
  <main id="chat-container">
    <navigation-component />
    <main id="body">
      <user-lists-component />
      <send-message />
    </main>
  </main>
</template>

<script lang="ts">
import { Component, Vue } from "vue-property-decorator";
import UserListsComponent from "@/components/user/UserListsComponent.vue";
import NavigationComponent from "@/components/common/NavigationComponent.vue";
import SendMessage from "@/components/chat/SendMessage.vue";

@Component({
  components: {
    NavigationComponent,
    UserListsComponent,
    SendMessage,
  },
})
export default class ChatList extends Vue {}
</script>

<style scoped>
/*#chat-container {*/
/*  text-align: center;*/
/*  background: white;*/
/*  border-radius: 20px;*/
/*  box-shadow: 0 1px 1px 1px #c7c7c7;*/
/*  width: 50vw;*/
/*  height: 75vh;*/
/*  max-height: 500px;*/
/*  margin: 5em auto;*/
/*  overflow-y: auto;*/
/*}*/

#body {
  display: flex;
  flex-direction: row;
  justify-content: space-between;
}
</style>
