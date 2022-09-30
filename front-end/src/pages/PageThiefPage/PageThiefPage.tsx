import React from "react";
import { RouterLink } from "mobx-state-router";
import { RouteNames } from "../../routes";
import { useRootStore } from "../../utils/rootStoreUtils";
import styles from "./PageThiefPage.module.sass";
import { useObserver } from "mobx-react-lite";
import { TBSetting } from "./TBSetting/TBSetting";
import { textTypeEnum } from "../../stores/ThiefBoardStore/ThiefBoardStore";
import { DropList } from "../../components/UI/DropList/DropList";

const ThiefBoard = () => {
  const { thiefBoardStore: store } = useRootStore();
  return useObserver(() => (
    <div className={`${styles.TB}`}>
      <TBSetting store={store} />
      <div className={`${styles.TBDisplay}`}>
        <div className={`${styles.TBDisplay__body}`}>
          {
            {
              [textTypeEnum.original]: store.OriginalHtml,
              [textTypeEnum.result]: store.ResultHtml,
              [textTypeEnum.stats]: store.Stats.map((el, i) => (
                <DropList key={i + "Stats list" + el.name} name={el.name} val={el.val} items={el.list} />
              )),
            }[store.textType]
          }
        </div>
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
