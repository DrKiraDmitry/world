import { action, observable } from "mobx";
import { RootStore } from "src/stores/RootStore";
import { RouterState } from "mobx-state-router";
import { RouteNames } from "src/routes";
import { UserTypes } from "src/types/back/UserTypes";

export class UserShellStore {
  @observable one: boolean = true;
  @observable data: UserTypes | null = null;

  constructor(public rootStore: RootStore) {}

  @action Switch() {
    this.one = !this.one;
  }

  @action async GetUser() {
    try {
      const r = await this.rootStore.userRpc.send("/user", null, "GET");
      this.data = r;
    } catch (e) {
      console.log(e);
    }
  }

  @action async LogOut() {
    this.rootStore.userRpc.resetUserToken();
    await this.rootStore.routerStore.goTo(new RouterState(RouteNames.welcome));
  }
}
