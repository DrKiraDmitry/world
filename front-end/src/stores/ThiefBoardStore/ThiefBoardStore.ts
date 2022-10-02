import { RootStore } from "../RootStore";
import { action, observable } from "mobx";
import { Text, PrefixesAll } from "./Text";
import { Algorithms } from "./Algorithms";
import { Stats } from "./Stats";

export enum textTypeEnum {
  original = "Original",
  result = "Result",
  stats = "Stats",
}

export const textTypeArray: any[] = Object.values(textTypeEnum);

export class ThiefBoardStore extends Algorithms {
  @observable ResultHtml: string = "";
  @observable OriginalHtml: string = Text;
  @observable Stats: { name: string | number; val: string | number; list?: any[] }[] = [];
  @observable textType: textTypeEnum = textTypeEnum.stats;
  @observable ThiefLink: string =
    "https://novayagazeta.ru/articles/2022/07/28/rkn-trebuet-annulirovat-litsenziiu-smi-u-saita-novoi-gazety";
  @observable ArticleTag: string = "#materialBlock_0";

  constructor(public rootStore: RootStore) {
    super();
  }

  @action StatsFunc() {
    this.Stats = Stats(this.OriginalHtml);
  }

  @action MainFunc() {}

  @action
  async takePage() {
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
