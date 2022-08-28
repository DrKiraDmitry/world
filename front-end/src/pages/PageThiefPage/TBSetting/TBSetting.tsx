import React, { FC } from "react";
import { ThiefBoardStore } from "src/stores/ThiefBoardStore/ThiefBoardStore";
import { LabelInput } from "src/components/Inputs/LabelInput";
import styles from "./TBSetting.module.sass";

type TBSetting__type = { store: ThiefBoardStore };

const TBSetting__GetPage: FC<TBSetting__type> = ({ store }) => {
  return (
    <div className={styles.TBSetting__componentBox}>
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
    </div>
  );
};

const TBSetting__TextView: FC<TBSetting__type> = ({ store }) => {
  return (
    <div className={`${styles.TBSetting__textView} ${styles.TBSetting__componentBox}`}>
      <button className={styles.TBSetting__button} onClick={() => (store.textType = true)}>
        Original
      </button>
      <button className={styles.TBSetting__button} onClick={() => (store.textType = false)}>
        Result
      </button>
    </div>
  );
};

const TBSetting__Algorithms: FC<TBSetting__type> = ({ store }) => {
  return (
    <div className={`${styles.TBSetting__label} ${styles.TBSetting__componentBox}`}>
      <div>Algorithms</div>
      <button className={styles.TBSetting__button} onClick={() => store.MainFunc()}>
        How mach Words
      </button>
    </div>
  );
};

export const TBSetting: FC<TBSetting__type> = ({ store }) => {
  return (
    <div className={`${styles.TBSetting}`}>
      <TBSetting__GetPage store={store} />
      {store.OriginalHtml && <TBSetting__Algorithms store={store} />}
      <TBSetting__TextView store={store} />
    </div>
  );
};
