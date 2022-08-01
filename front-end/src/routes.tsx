import React from "react";
import { Route, RouterState } from "mobx-state-router";
import { convertRoutes } from "src/routing/route";
import { FirstPage } from "src/pages/FirstPage/FirstPage";
import { LoginPage } from "src/pages/LoginPage/LoginPage";
import { RootStore } from "./stores/RootStore";

export interface RouteTransitionHook {
  (root: RootStore, next: () => Promise<void>, to: RouterState, from: RouterState): Promise<void> | void;
}

const UserAllowOnlyFilledProfilesHook: RouteTransitionHook = async (root) => {
  throw new RouterState(RouteNames.welcome);
};

export enum RouteNames {
  notFound = "not-found",
  index = "index",
  welcome = "welcome",
}

export const RouteViewMap = {
  [RouteNames.notFound]: <div>404 - not found</div>,
  [RouteNames.index]: <FirstPage />,
  [RouteNames.welcome]: <LoginPage />,
};

export const Routes: Route[] = convertRoutes([
  {
    pattern: "/not-found",
    name: RouteNames.notFound,
  },
  {
    pattern: "/",
    name: RouteNames.index,
    hooks: [UserAllowOnlyFilledProfilesHook],
  },
  {
    pattern: "/welcome",
    name: RouteNames.welcome,
  },
]);
