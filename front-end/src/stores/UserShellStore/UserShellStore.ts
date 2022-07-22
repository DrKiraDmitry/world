import { action, observable } from "mobx";
import { RootStore } from "src/stores/RootStore";
import { json } from "stream/consumers";

export class UserShellStore {
  @observable one: boolean = true;
  @observable data: any = {};

  constructor(public rootStore: RootStore) {}

  @action Switch() {
    this.one = !this.one;
  }

  @action testCopy() {
    const food = { app: "1", bpp: { aap: 1, bbp: 2 } };
    const foodNew = JSON.parse(JSON.stringify(food));
    foodNew.bpp.aap = 2;
    console.log(food, foodNew);
  }

  @action
  async getTodos() {
    try {
      const r = await fetch("http://localhost:4000").then((e) => e.json());
      this.data = r;
    } catch (e) {
      alert(e);
    }
  }
}
