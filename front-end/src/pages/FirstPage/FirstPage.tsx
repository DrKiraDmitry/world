import React from "react";
import { useRootStore } from "src/utils/rootStoreUtils";
import { World } from "../../components/World";

export const FirstPage = () => {
  const { firstPageStore: store } = useRootStore();
  return (
    <div>
      {store.one && <World />}
      <button onClick={() => store.Switch()}>Show World</button>
      {JSON.stringify(store.data)}
      <button onClick={() => store.getTodos()}>Get Todos</button>
    </div>
  );
};
