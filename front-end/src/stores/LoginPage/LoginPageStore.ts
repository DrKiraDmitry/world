import { action, observable } from "mobx";
import { RootStore } from "src/stores/RootStore";

export class LoginPageStore {
  @observable email: string = ''
  @observable password: string = ''

  constructor(public rootStore: RootStore) {}
  
  @action async login() {
    const data = {
      email: this.email,
      password: this.password,
    }
  }
}
