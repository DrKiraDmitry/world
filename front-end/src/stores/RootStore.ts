import { observable } from "mobx";
import { FirstPageStore } from "./FirstPageStore";
import {LoginPageStore} from "./LoginPage/LoginPageStore";

export class RootStore {
  @observable loginPageStore = new LoginPageStore(this);
  @observable firstPageStore = new FirstPageStore(this);
}
