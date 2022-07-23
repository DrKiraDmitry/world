import React from "react";
import { Route } from "mobx-state-router";
import { convertRoutes } from "./route";
import { FirstPage } from "../pages/FirstPage/FirstPage";
import { LoginPage } from "src/pages/LoginPage/LoginPage";

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
  },
  {
    pattern: "/welcome",
    name: RouteNames.welcome,
  },
]);
