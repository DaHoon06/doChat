<template>
  <nav>
    <small><strong>{{ this.name }} 님</strong></small>
    <button @click="logout">logout</button>
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
    if (result) this.$router.replace('/');
  }
}
</script>

<style scoped>

</style>
