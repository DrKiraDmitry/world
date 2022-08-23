import { observable } from "mobx";
import { FirstPageStore } from "./FirstPageStore";
import { LoginPageStore } from "./LoginPage/LoginPageStore";
import { RouterState, RouterStore } from "mobx-state-router";
import { RouteNames, Routes } from "src/routes";
import { UserShellStore } from "./UserShellStore/UserShellStore";
import { LocalStoreChanger, SecureCoreApi } from "./ETCStore";
import { ThiefBoardStore } from "./ThiefBoardStore/ThiefBoardStore";

export class RootStore {
  @observable userRpc = new SecureCoreApi("http://localhost:4000", "X-User-Auth");
  @observable optimizationStore = new LocalStoreChanger();
  @observable routerStore = new RouterStore(this, Routes, new RouterState(RouteNames.notFound));
  @observable loginPageStore = new LoginPageStore(this);
  @observable firstPageStore = new FirstPageStore(this);
  @observable userShellStore = new UserShellStore(this);
  @observable thiefBoardStore = new ThiefBoardStore(this);
}
