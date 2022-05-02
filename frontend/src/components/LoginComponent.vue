<template>
  <section id="login-container">

    <article>
      <div id="profile-img">
        <img src="@/assets/img.png" alt="profile" />
      </div>

      <div>
        <label><small>닉네임을 입력해주세요.</small></label>
        <input type="text"  v-model="nickName"/>
      </div>
      <div>
        <button id="login-btn" @click="login">go</button>
      </div>
    </article>

  </section>
</template>

<script lang="ts">
import { Component, Vue } from "vue-property-decorator";

@Component
export default class LoginComponent extends Vue {
  nickName = '';

  async login() {
    const sendData = {
      nickName: this.nickName,

    };
    await this.$store.dispatch('UserStore/login', sendData)
  }


}
</script>

<style scoped>
input {
  font-weight: 400;
  padding-bottom: 0.3em;
  margin-top: 10px;
  border: none;
  background: none;
  border-bottom: 1px solid #d0d0d0;
  text-align: center;
}

#login-container {
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

#login-btn {
  border: 1px solid #d0d0d0;
  color: #757575;
  background: #cfcff4;
  font-weight: 400;
  border-radius: 5px;
  margin-top: 3em;
  width: 20%;
  height: 1.8em;
}
#login-btn:hover {
  border: none;
  cursor: pointer;
  background: #c5c5ee;
  color: #f5f5f5;
}

#profile-img {
  margin: auto;
  background: gray;
  border: 1px solid #f5f5f5;
  border-radius: 45px;
  width: 40px;
  height: 40px;
}
#profile-img > img {
  width: 30px;
}
</style>
