import { action, observable } from "mobx";
import { RootStore } from "src/stores/RootStore";
import { RouteNames } from "../../routes";
import { RouterState } from "mobx-state-router";

export class LoginPageStore {
  @observable email: string = "";
  @observable password: string = "";

  constructor(public rootStore: RootStore) {}

  @action async login() {
    const data = {
      email: this.email,
      password: this.password,
    };

    try {
      const r = await this.rootStore.userRpc.authorized(data);
      await this.rootStore.routerStore.goTo(new RouterState(RouteNames.index));
    } catch (e) {
      console.log(e);
    }
  }

  @action async register() {
    const data = {
      email: this.email,
      password: this.password,
    };

    try {
      const r = await this.rootStore.userRpc.send("/register", data);
      await this.rootStore.routerStore.goTo(new RouterState(RouteNames.index));
    } catch (e) {
      console.log(e);
    }
  }

  @action clear() {
    this.email = "";
    this.password = "";
  }
}
