<template>
  <div>

    <small>{{ this.name }} 님</small>
    <div id="user-list">
      <div id="user-list-items" v-for="(lists, index) of this.userLists" :key="index">
        <span class="list-items">
          <a>{{ lists.name }}</a>
        </span>
        <span v-if="lists.connecting" id="isLogin" class="list-items"></span>
        <span v-else id="isLogout" class="list-items"></span>
      </div>
    </div>

  </div>
</template>

<script lang="ts">
import { Component, Vue } from "vue-property-decorator";

export interface IUserLists {
  name: string;
  createdAt: Date;
  updatedAt: Date;
  connecting: boolean
}

@Component
export default class ChatComponent extends Vue {
  name: string;
  userLists: IUserLists[];

  constructor() {
    super();
    this.name = '';
    this.userLists = [];
  }
  async created() {
    await this.load();
  }

  async load() {
    this.name = this.$store.getters['userStore/name'];
    const{ data } = await this.axios.get('/user/chatLists');
    this.userLists = data;
    console.log(data);
  }

}
</script>

<style scoped>
#user-list {
  display: flex;
  flex-direction: column;
}

#user-list-items {
  display: flex;
  justify-content: space-between;
  align-items: center;
}

#isLogin::after {
  content: '🟢';
}

#isLogout::after {
  content: '🔴';
}

.list-items {
  margin: 0.5em 0.5em;
  color: #cfcff4;
}

.list-items > a:hover {
  cursor: pointer;
  color: #c5c5ee;
  font-weight: 500;
}
</style>
