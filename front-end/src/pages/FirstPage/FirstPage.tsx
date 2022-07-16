import React from "react";
import { useRootStore } from "src/utils/rootStoreUtils";

export const FirstPage = () => {
  const { firstPageStore: store } = useRootStore();
  return <div></div>;
};
