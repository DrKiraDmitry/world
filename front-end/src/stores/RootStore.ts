import { observable } from "mobx";
import { FirstPageStore } from "./FirstPageStore";
import { LoginPageStore } from "./LoginPage/LoginPageStore";
import { RouterState, RouterStore } from "mobx-state-router";
import { RouteNames, Routes } from "src/routes";
import { UserShellStore } from "./UserShellStore/UserShellStore";
import { LocalStoreChanger } from "./ETCStore";

export class RootStore {
  @observable anonRpc: any;
  @observable userRpc: any;
  @observable optimizationStore = new LocalStoreChanger();
  @observable routerStore = new RouterStore(this, Routes, new RouterState(RouteNames.notFound));
  @observable loginPageStore = new LoginPageStore(this);
  @observable firstPageStore = new FirstPageStore(this);
  @observable userShellStore = new UserShellStore(this);
}
