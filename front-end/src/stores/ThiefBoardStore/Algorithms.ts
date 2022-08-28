import { Unions } from "./Text";

export class Algorithms {
  //Отчищает статью от знаков препинания, переводит всё в нижний регистр и возвращает массив слов
  public ClearArticle(article: string) {
    const lowerCase = article.toLowerCase();
    const clearArticle = lowerCase.replace(/[.,\/#!$%\^&\*;:{}=\-_`~()—\?»«\n]/g, " ").replace(/\s{2,}/g, " ");
    const splitArticle = clearArticle.split(" ");
    return splitArticle;
  }

  //Вычисляет сколько одинаковых слов в тексте, а так же проходит отчистка от союзов
  public HowMachWords(article: string) {
    const clearText = this.ClearArticle(article);
    const arrayIncrement = clearText.reduce((acc, el) => {
      if (Unions.includes(el)) return acc;
      const val = acc.findIndex((elF) => elF.name === el);
      if (val >= 0) {
        acc[val].val++;
        return acc;
      } else {
        return [...acc, { name: el, val: 1 }];
      }
    }, [] as { name: string; val: number }[]);
    const arraySort = arrayIncrement.sort((a, b) => {
      return b.val - a.val;
    });
    return arraySort;
  }

  //Для поиска однокоренных слов TODO
  SingleRooted(text: string[]) {
    const oneRoot: string[][] = [];
    let buffer = [];
    for (let i = 0; i >= text.length; i++) {}
    return oneRoot;
  }
}
