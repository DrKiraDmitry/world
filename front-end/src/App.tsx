import React from "react";
import { RootStore } from "src/stores/RootStore";
import { observer, Provider } from "mobx-react";
import createBrowserHistory from "history/createBrowserHistory";
import { LoadingIf } from "src/components/Loading";
import { HistoryAdapter, RouterView } from "mobx-state-router";
import { RouteViewMap } from "./routes";
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
  return (
    <Provider rootStore={root}>
      {root.userRpc.isAuthorized ? (
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
