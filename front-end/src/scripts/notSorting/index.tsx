const splitLink = (text: string, code: string) => {
  const splitWord = {
    [ShowTypeState.exposition]: "На экспозиции",
    [ShowTypeState.pickup]: "В наличии",
  }[code];

  if (!splitWord) return { black: text, blue: "" };

  let black = "",
    blue = "";

  blue = text.split(splitWord)[1];
  black = text.split(blue)[0];

  return { black, blue };
};
