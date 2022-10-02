//Отчищает статью от знаков препинания, переводит всё в нижний регистр и возвращает массив слов
import {PrefixesAll} from "../Text";

export const ClearArticle = (article: string) => {
  const lowerCase = article.toLowerCase();
  const clearArticle = lowerCase.replace(/[.,\/#!$%\^&\*;:{}=\-_`~()—\?»«\n]/g, " ").replace(/\s{2,}/g, " ");
  const splitArticle = clearArticle.split(" ");
  return splitArticle;
}

const RemovePrefixes = (text: string[]) => {
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
