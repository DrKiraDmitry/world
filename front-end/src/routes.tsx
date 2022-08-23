import React from "react";
import { Route, RouterState } from "mobx-state-router";
import { convertRoutes } from "src/routing/route";
import { FirstPage } from "src/pages/FirstPage/FirstPage";
import { LoginPage } from "src/pages/LoginPage/LoginPage";
import { RootStore } from "./stores/RootStore";
import { PageThiefPage } from "./pages/PageThiefPage/PageThiefPage";

export interface RouteTransitionHook {
  (root: RootStore, next: () => Promise<void>, to: RouterState, from: RouterState): Promise<void> | void;
}

const UserAllowHook: RouteTransitionHook = async (root) => {
  if (!root.userRpc.isAuthorized) {
    throw new RouterState(RouteNames.welcome);
  }
};

const UserAuthorizeHook: RouteTransitionHook = async (root) => {
  if (root.userRpc.isAuthorized) {
    throw new RouterState(RouteNames.index);
  }
};

const ShowMenu: RouteTransitionHook = (root) => {
  root.userShellStore.menuShow = true;
};

const HideMenu: RouteTransitionHook = (root) => {
  root.userShellStore.menuShow = false;
};

export enum RouteNames {
  notFound = "not-found",
  index = "index",
  welcome = "welcome",
  pageThief = "pageThief",
}

export const RouteViewMap = {
  [RouteNames.notFound]: <div>404 - not found</div>,
  [RouteNames.index]: <FirstPage />,
  [RouteNames.welcome]: <LoginPage />,
  [RouteNames.pageThief]: <PageThiefPage />,
};

export const Routes: Route[] = convertRoutes([
  {
    pattern: "/not-found",
    name: RouteNames.notFound,
  },
  {
    pattern: "/",
    name: RouteNames.index,
    hooks: [UserAllowHook, ShowMenu],
    onEnter: async (root) => {
      if (root.userShellStore.data === null) await root.userShellStore.GetUser();
    },
  },
  {
    pattern: "/welcome",
    name: RouteNames.welcome,
    hooks: [UserAuthorizeHook],
    onEnter: (root) => {
      root.loginPageStore.clear();
    },
  },
  {
    pattern: "/page-thief",
    name: RouteNames.pageThief,
    hooks: [UserAllowHook, HideMenu],
  },
]);
