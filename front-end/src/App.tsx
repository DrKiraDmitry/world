import React from "react";
import { RootStore } from "src/stores/RootStore";
import { observer, Provider } from "mobx-react";
import { createBrowserHistory } from "history";
import { LoadingIf } from "src/components/Loading";
import { HistoryAdapter, RouterView } from "mobx-state-router";
import { RouteViewMap } from "./routing/routes";
import "mobx-react-lite/batchingForReactDom";
import { UserShell } from "./components/Shell/UserShell";

let root: RootStore;

const ensureInitialized = () => {
  if (root) return;
  root = new RootStore();
  const historyAdapter = new HistoryAdapter(root.routerStore, createBrowserHistory());
  historyAdapter.observeRouterStateChanges();
};

export const App = observer(() => {
  ensureInitialized();
  return (
    <Provider rootStore={root}>
      <UserShell>
        <LoadingIf isLoading={root.routerStore.isTransitioning}>
          <RouterView routerStore={root.routerStore} viewMap={RouteViewMap} />
        </LoadingIf>
      </UserShell>
    </Provider>
  );
});
