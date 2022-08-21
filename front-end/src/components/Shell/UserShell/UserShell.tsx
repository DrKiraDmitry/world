import React, { FC } from "react";
import { ThreeScene } from "src/components/World/World";
import { useRootStore } from "src/utils/rootStoreUtils";
import { UserShellStore } from "src/stores/UserShellStore/UserShellStore";
import { useObserver } from "mobx-react-lite";
import styles from "./UserShell.module.sass";

const Menu: FC<{ store: UserShellStore }> = ({ store }) => {
  return (
    <nav className={styles.nav}>
      <ul>
        <li onClick={() => store.Switch()}>
          <button>Disable Map</button>
        </li>
        <li onClick={() => store.LogOut()}>
          <button>LogOut</button>
        </li>
      </ul>
    </nav>
  );
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
