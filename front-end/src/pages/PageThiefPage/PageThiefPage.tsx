import React, { FC, useState } from "react";
import { LabelInput } from "../../components/Inputs/LabelInput";
import { RouterLink } from "mobx-state-router";
import { RouteNames } from "../../routes";
import { useRootStore } from "../../utils/rootStoreUtils";
import styles from "./PageThiefPage.module.sass";
import { useObserver } from "mobx-react-lite";
import { ThiefBoardStore } from "../../stores/ThiefBoardStore/ThiefBoardStore";

const ThiefBoard__GetPage: FC<{ store: ThiefBoardStore }> = ({ store }) => {
  return (
    <>
      <LabelInput
        value={store.ThiefLink}
        className={styles.TBSetting__input}
        styleOnLabel={styles.TBSetting__label}
        onChange={(e) => (store.ThiefLink = e.target.value)}
        title={"Link"}
      />
      <LabelInput
        value={store.ArticleTag}
        className={styles.TBSetting__input}
        styleOnLabel={styles.TBSetting__label}
        onChange={(e) => (store.ArticleTag = e.target.value)}
        title={"Article Tag"}
      />
      <button className={styles.TBSetting__button} onClick={() => store.takePage()}>
        Get Page
      </button>
    </>
  );
};

const ThiefBoard = () => {
  const { thiefBoardStore: store } = useRootStore();
  return useObserver(() => (
    <div className={`${styles.TB}`}>
      <div className={`${styles.TBSetting}`}>
        <ThiefBoard__GetPage store={store} />
      </div>
      <div className={`TBDisplay`}>
        {/*<div className={`TBDisplay__header`}>*/}
        {/*  <button onClick={() => setTextType(true)}>Original</button>*/}
        {/*  <button onClick={() => setTextType(false)}>Result</button>*/}
        {/*</div>*/}
        <div className={`TBDisplay__body`}>{store.OriginalHtml}</div>
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
