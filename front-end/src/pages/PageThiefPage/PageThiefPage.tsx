import React from "react";
import { RouterLink } from "mobx-state-router";
import { RouteNames } from "../../routes";
import { useRootStore } from "../../utils/rootStoreUtils";
import styles from "./PageThiefPage.module.sass";
import { useObserver } from "mobx-react-lite";
import { TBSetting } from "./TBSetting/TBSetting";

const ThiefBoard = () => {
  const { thiefBoardStore: store } = useRootStore();
  return useObserver(() => (
    <div className={`${styles.TB}`}>
      <TBSetting store={store} />
      <div className={`${styles.TBDisplay}`}>
        <div className={`${styles.TBDisplay__body}`}>{store.textType ? store.OriginalHtml : store.ResultHtml}</div>
      </div>
    </div>
  ));
};

export const PageThiefPage = () => {
  return (
    <div className={`flex flex-col`} style={{ height: "100%", padding: `2rem`, boxSizing: "border-box" }}>
      <RouterLink routeName={RouteNames.index} className={styles.goBack}>
        <button>Go Home</button>
      </RouterLink>
      <ThiefBoard />
    </div>
  );
};
