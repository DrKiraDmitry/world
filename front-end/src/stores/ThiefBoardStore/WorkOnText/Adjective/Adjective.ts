//В современном русском языке имена прилагательные в им. п. ед. ч. м. р. под ударением всегда имеют окончание -ой, без ударения — -ый или -ий:
import { ClearArticle } from "../../SupportScript/SupportScript";

const ends = ["ой", "ый", "ий"];

export const AdjectiveOnArray = (text: string) => {
  const clearText = ClearArticle(text);
  const result = clearText.reduce<string[]>((acc, el) => {
    if (ends.includes(el.slice(-2))) return [...acc, el];
    return acc;
  }, []);
  return {
    name: "Прилагательные",
    val: result.length,
    list: result,
  };
};
