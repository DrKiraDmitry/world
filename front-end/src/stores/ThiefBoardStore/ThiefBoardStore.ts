import { RootStore } from "../RootStore";
import { action, observable } from "mobx";
import { Text } from "./Text";
import { Algorithms } from "./Algorithms";

export class ThiefBoardStore extends Algorithms {
  @observable ResultHtml: string = "";
  @observable OriginalHtml: string = Text;
  @observable textType = false;
  @observable ThiefLink: string =
    "https://novayagazeta.ru/articles/2022/07/28/rkn-trebuet-annulirovat-litsenziiu-smi-u-saita-novoi-gazety";
  @observable ArticleTag: string = "#materialBlock_0";
  constructor(public rootStore: RootStore) {
    super();
  }

  SingleRooted(text: string[]) {
    return text;
  }

  @action MainFunc() {
    const first = this.HowMachWords(this.OriginalHtml);
    const second = this.SingleRooted(first.reduce((acc, el) => [...acc, el.name], [] as string[]));

    this.ResultHtml = JSON.stringify(second, null, "\t");
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
