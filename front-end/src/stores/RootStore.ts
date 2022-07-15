import { observable } from "mobx";
import { FirstPageStore } from "./FirstPageStore";
import { LoginPageStore } from "./LoginPage/LoginPageStore";
import { RouterState, RouterStore } from "mobx-state-router";
import { Routes } from "../routing/routes";

export class RootStore {
  @observable routerStore = new RouterStore(this, Routes, new RouterState("not-found"));
  @observable loginPageStore = new LoginPageStore(this);
  @observable firstPageStore = new FirstPageStore(this);
}
