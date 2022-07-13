import { action, observable } from "mobx";
import { RootStore } from "./RootStore";

export class FirstPageStore {
  @observable one: boolean = false;

  constructor(public rootStore: RootStore) {}

  @action Switch() {
    this.one = !this.one;
  }
}
