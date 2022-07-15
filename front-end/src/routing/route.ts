import {RootStore} from "src/stores/RootStore";
import {Route, RouterState} from "mobx-state-router";

export interface RouteTransition {
  (root: RootStore, to: RouterState, from: RouterState): Promise<void> | void;
}

export interface RouteTransitionHook {
  (root: RootStore, next: () => Promise<void>, to: RouterState, from: RouterState): Promise<void> | void;
}

export interface AppRoute {
  name: string;
  pattern: string;
  hooks?: RouteTransitionHook[];
  onEnter?: RouteTransition;
}

export function convertRoute(appRoute: AppRoute): Route {
  return {
    name: appRoute.name,
    pattern: appRoute.pattern,
    onEnter: async (fromState, toState, routerStore) => {
      const root = routerStore.rootStore as RootStore;
      try {
        let current = async () => {
          if (appRoute.onEnter) await appRoute.onEnter(root, toState, fromState);
        };

        if (appRoute.hooks) {
          for (const hook of appRoute.hooks.slice().reverse())
            (() => {
              const next = current;
              current = async () => {
                let called = false;
                await hook(
                  root,
                  () => {
                    called = true;
                    return next();
                  },
                  toState,
                  fromState
                );
                // Automagically call the next hook if it wasn't called by the current one
                if (!called) await next();
              };
            })();
        }
        await current();
      } catch (e) {
        if (e instanceof RouterState) throw e;
        alert(e);
        throw fromState;
      }
    },
  };
}

export const convertRoutes = (appRoute: AppRoute[]): Route[] => appRoute.map(convertRoute);
