<template>
  <main>
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

}
</script>

<style scoped>

</style>
