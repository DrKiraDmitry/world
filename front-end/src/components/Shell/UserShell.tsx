import React, { FC } from "react";
import { World } from "src/components/World/World";
import { useRootStore } from "src/utils/rootStoreUtils";
import { UserShellStore } from "src/stores/UserShellStore/UserShellStore";
import { useObserver } from "mobx-react-lite";
import styles from "./UserShell.module.sass";

const Menu: FC<{ store: UserShellStore }> = ({ store }) => {
  return (
    <nav className={styles.nav}>
      <ul>
        <li>
          <button onClick={() => store.Switch()}>Disable Map</button>
        </li>
        <li>
          <button onClick={() => store.Switch()}>LogOut</button>
        </li>
      </ul>
    </nav>
  );
};

export const UserShell: FC = ({ children }) => {
  const { userShellStore: store } = useRootStore();
  return useObserver(() => (
    <div>
      <Menu store={store} />
      {store.one && <World />}
      {children}
    </div>
  ));
};
