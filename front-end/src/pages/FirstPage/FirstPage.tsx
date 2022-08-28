import React from "react";
import { useRootStore } from "src/utils/rootStoreUtils";
import { useObserver } from "mobx-react-lite";
import UserInfoBlockStyle from "./UserInfoBlock.module.sass";

export const UserInfoBlock = () => {
  const { userShellStore: storeUser } = useRootStore();
  console.time("1");
  const Key = Object.keys(storeUser.data || {});
  const Val = Object.values(storeUser.data || {});
  console.timeEnd("1");
  return useObserver(() => (
    <div className={`${UserInfoBlockStyle.userInfo__list}`}>
      {Key.map((el, i) => {
        if (Val[i]) {
          return (
            <div className={`${UserInfoBlockStyle.userInfo__list__item}`}>
              {el}: <span>{Val[i]}</span>
            </div>
          );
        }
        return;
      })}
    </div>
  ));
};

export const FirstPage = () => {
  return (
    <div className={`flex`} style={{ height: `100%` }}>
      <UserInfoBlock />
    </div>
  );
};
