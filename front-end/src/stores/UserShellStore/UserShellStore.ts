import { action, observable } from "mobx";
import { RootStore } from "src/stores/RootStore";
import { json } from "stream/consumers";
import { RouterState } from "mobx-state-router";
import { RouteNames } from "../../routes";

export class UserShellStore {
  @observable one: boolean = true;
  @observable data: any = {};

  constructor(public rootStore: RootStore) {}

  @action Switch() {
    this.one = !this.one;
  }

  @action async LogOut() {
    this.rootStore.userRpc.resetUserToken();
    await this.rootStore.routerStore.goTo(new RouterState(RouteNames.welcome));
  }
}
