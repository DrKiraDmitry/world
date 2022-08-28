import { RootStore } from "../RootStore";
import { action, observable } from "mobx";
import { Text, PrefixesAll } from "./Text";
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

  RemovePrefixes(text: string[]) {
    const buffer: string[] = [];
    const reg = new RegExp(
      PrefixesAll.reduce((acc, el, i) => (PrefixesAll.length - 1 > i ? acc + `^${el}|` : acc + `^${el}`), "")
    );
    console.log(reg);
    for (let i = 0; i < text.length; i++) {
      buffer.push(text[i].replace(reg, ""));
    }
    return buffer;
  }

  @action MainFunc() {
    const first = this.HowMachWords(this.OriginalHtml);
    const unic = first.reduce((acc, el) => [...acc, el.name], [] as string[]);
    const prefixRemove = this.RemovePrefixes(unic);
    // const second = this.SingleRooted(unic);

    this.ResultHtml = JSON.stringify(prefixRemove, null, "\t");
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
