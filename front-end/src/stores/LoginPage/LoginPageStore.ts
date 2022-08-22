import { action, observable } from "mobx";
import { RootStore } from "src/stores/RootStore";
import { RouteNames } from "../../routes";
import { RouterState } from "mobx-state-router";

export class LoginPageStore {
  @observable email: string = "";
  @observable password: string = "";

  constructor(public rootStore: RootStore) {}

  @action async LogRegRPC(path: "/login" | "/register") {
    const data = {
      email: this.email,
      password: this.password,
    };

    try {
      await this.rootStore.userRpc.authorized(path, data);
      await this.rootStore.routerStore.goTo(new RouterState(RouteNames.index));
    } catch (e) {
      console.log(e);
    }
  }

  @action async login() {
    await this.LogRegRPC("/login");
  }

  @action async register() {
    await this.LogRegRPC("/register");
  }

  @action clear() {
    this.email = "";
    this.password = "";
  }
}
