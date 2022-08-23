import { RootStore } from "../RootStore";
import { action, observable } from "mobx";

export class ThiefBoardStore {
  @observable ResultHtml: string = "";
  @observable OriginalHtml: string = "";

  @observable ThiefLink: string =
    "https://novayagazeta.ru/articles/2022/07/28/rkn-trebuet-annulirovat-litsenziiu-smi-u-saita-novoi-gazety";
  @observable ArticleTag: string = "#materialBlock_0";
  constructor(public rootStore: RootStore) {}

  @action MainFunc() {
    this.ResultHtml = "r";
  }

  @action async takePage() {
    const data = {
      link: this.ThiefLink,
      articleTag: this.ArticleTag,
    };

    try {
      const r = await this.rootStore.userRpc.send("/thief-page", data);
      this.OriginalHtml = r;
    } catch (e) {
      console.log(e);
    }
  }
}
