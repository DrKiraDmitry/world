import React, { FC } from "react";
import { ThreeScene } from "src/components/World/World";
import { useRootStore } from "src/utils/rootStoreUtils";
import { UserShellStore } from "src/stores/UserShellStore/UserShellStore";
import { useObserver } from "mobx-react-lite";
import styles from "./UserShell.module.sass";
import { RouterLink } from "mobx-state-router";
import { RouteNames } from "../../../routes";

const Menu: FC<{ store: UserShellStore }> = ({ store }) => {
  return useObserver(() => (
    <nav className={styles.nav}>
      <ul>
        <li>
          <RouterLink routeName={RouteNames.index}>
            <button>Home</button>
          </RouterLink>
        </li>
        <li onClick={() => store.LogOut()}>
          <button>LogOut</button>
        </li>
      </ul>
    </nav>
  ));
};

export const UserShell: FC = ({ children }) => {
  const { userShellStore: store } = useRootStore();
  return useObserver(() => (
    <div style={{ height: `100vh`, width: `100vw` }}>
      <Menu store={store} />
      {children}
    </div>
  ));
};
