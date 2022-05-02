<template>
  <main>
    <login-component></login-component>
  </main>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator';
import LoginComponent from "@/components/LoginComponent.vue";


@Component({
  components: {
    LoginComponent
  },
})
export default class Home extends Vue {

}
</script>

<style scoped>

</style>
