import { Unions } from "./Text";
import { ClearArticle } from "./SupportScript/SupportScript";
import { DropListProps } from "../../components/UI/DropList/DropList";
import { AdjectiveOnArray } from "./WorkOnText/Adjective/Adjective";

//Вычисляет сколько одинаковых слов в тексте, а так же проходит отчистка от союзов
const HowMachWords = (article: string) => {
  const clearText = ClearArticle(article);
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
  return {
    name: "HowMachWords",
    val: arraySort.length,
    list: arraySort,
  };
};

export const Stats = (text: string): DropListProps[] => [HowMachWords(text), AdjectiveOnArray(text)];
