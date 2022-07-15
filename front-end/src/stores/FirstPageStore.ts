import { action, observable } from "mobx";
import { RootStore } from "./RootStore";

export class FirstPageStore {
  @observable one: boolean = false;
  @observable data: any = {};

  constructor(public rootStore: RootStore) {}

  @action Switch() {
    this.one = !this.one;
  }

  @action async getTodos() {
    try {
      const r = await fetch("http://localhost:4000").then((e) => e.json());
      this.data = r;
    } catch (e) {
      alert(e);
    }
  }
}
