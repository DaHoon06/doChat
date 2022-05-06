import Vue from "vue";

declare module 'socket.io-client';

declare module 'vue/types/vue' {
  interface Vue {
    $socket: any;

  }
}

