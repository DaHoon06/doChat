<template>
  <nav >
    <div id="header-container">
      <span id="login-user">
        <small><strong id="user-info">{{ this.name }} 접속중</strong></small>
      </span>
      <span>
        <button id="logout-btn" @click="logout">logout</button>
      </span>
    </div>
    <hr/>
  </nav>
</template>

<script lang="ts">
import { Component, Vue } from "vue-property-decorator";

@Component
export default class NavigationComponent extends Vue{
  name: string;
  constructor() {
    super();
    this.name = '';
  }

  created() {
    this.name = this.$store.getters['userStore/name'];
  }

  private logout() {
    const result = this.$store.dispatch('userStore/logout', this.name);
    if (result) {
      this.$socket.emit('closedChat', this.getName);
      this.$router.replace('/');
    }
  }


}
</script>

<style scoped>
hr {
  margin: 0.3em auto;
}
#user-info {
  color: #8a8a8a;
}
#user-info::after {
  content: ' |';
}
#header-container {
  display: flex;
  justify-content: flex-end;
  padding: 0.5em 0;
}
#login-user {
  margin-right: 0.5em;
  height: 1em;
}
#logout-btn {
  color: #8a8a8a;
  margin-right: 0.5em;
  height: 1.7em;
}
#logout-btn:hover {
  color: #a4a4d3;
  cursor: pointer;
  border-bottom: 0.2em solid #a4a4d3;
}
</style>
