import React, { useEffect, useState } from "react";
import { RootStore } from "src/stores/RootStore";
import { observer, Provider } from "mobx-react";
import { createBrowserHistory } from "history";
import { LoadingIf } from "src/components/Loading";
import { HistoryAdapter, RouterView } from "mobx-state-router";
import { RouteViewMap } from "./routing/routes";
import "mobx-react-lite/batchingForReactDom";
import { UserShell } from "src/components/Shell/UserShell/UserShell";
import { AnonShell } from "./components/Shell/AnonShell/AnonShell";

let root: RootStore;

const ensureInitialized = () => {
  if (root) return;
  root = new RootStore();
  const historyAdapter = new HistoryAdapter(root.routerStore, createBrowserHistory());
  historyAdapter.observeRouterStateChanges();
};

export const App = observer(() => {
  ensureInitialized();
  const [cookie, setCookie] = useState(false);
  return (
    <Provider rootStore={root}>
      <button style={{ position: "fixed", left: 0 }} onClick={() => root.optimizationStore.clear()}>
        Clear
      </button>
      {cookie ? (
        <UserShell>
          <LoadingIf isLoading={root.routerStore.isTransitioning}>
            <RouterView routerStore={root.routerStore} viewMap={RouteViewMap} />
          </LoadingIf>
        </UserShell>
      ) : (
        <AnonShell>
          <LoadingIf isLoading={root.routerStore.isTransitioning}>
            <RouterView routerStore={root.routerStore} viewMap={RouteViewMap} />
          </LoadingIf>
        </AnonShell>
      )}
    </Provider>
  );
});
