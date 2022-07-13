import { observable } from "mobx";
import { FirstPageStore } from "./FirstPageStore";

export class RootStore {
  @observable firstPageStore = new FirstPageStore(this);
}
