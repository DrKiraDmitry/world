import { action, observable } from "mobx";
import { RootStore } from "src/stores/RootStore";

export class LoginPageStore {
  @observable email: string = "";
  @observable password: string = "";

  constructor(public rootStore: RootStore) {}

  @action async login() {
    const data = {
      email: this.email,
      password: this.password,
    };

    try {
      const r = await fetch("http://localhost:4000/login", {
        method: "POST",
        body: JSON.stringify(data),
        headers: {
          "Content-Type": "application/json",
        },
      }).then((e) => e);
    } catch (e) {
      console.log(e);
    }
  }

  @action async register() {
    const data = {
      email: this.email,
      password: this.password,
    };

    try {
      const r = await fetch("http://localhost:4000/register", {
        method: "POST",
        body: JSON.stringify(data),
        headers: {
          "Content-Type": "application/json",
        },
      }).then((e) => e);
    } catch (e) {
      console.log(e);
    }
  }

  @action clear() {
    this.email = "";
    this.password = "";
  }
}
