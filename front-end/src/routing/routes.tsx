import React from "react";
import { Route } from "mobx-state-router";
import { convertRoutes } from "./route";

export enum RouteNames {
  notFound = "not-found",
  index = "index",
}

export const RouteViewMap = {
  [RouteNames.notFound]: <div>404 - not found</div>,
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
]);
