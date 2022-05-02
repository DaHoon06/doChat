<template>
  <div>
    리리
    {{ this.$store.getters['userStore/name'] }}
  </div>
</template>

<script lang="ts">
import { Component, Vue } from "vue-property-decorator";

@Component
export default class ChatComponent extends Vue {

  async created() {
    await this.load();
  }

  async load() {
    console.log('test');
  }

}
</script>

<style scoped>

</style>
