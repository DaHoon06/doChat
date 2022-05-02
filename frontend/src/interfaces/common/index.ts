export namespace IStore {
  export interface State {
    isLogin: boolean;
    name: string;
    token: string;
  }

  export interface LoginSuccess {
    name: string;
    token: string;
  }

}
