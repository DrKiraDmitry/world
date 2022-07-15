import React from "react";
import "src/App.css";
import { RootStore } from "src/stores/RootStore";
import { observer, Provider } from "mobx-react";
import { createBrowserHistory } from "history";
import { LoadingIf } from "src/components/Loading";
import { HistoryAdapter, RouterView } from "mobx-state-router";
import { RouteViewMap } from "./routing/routes";
import "mobx-react-lite/batchingForReactDom";

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
      <LoadingIf isLoading={root.routerStore.isTransitioning}>
        <RouterView routerStore={root.routerStore} viewMap={RouteViewMap} />
      </LoadingIf>
    </Provider>
  );
});
