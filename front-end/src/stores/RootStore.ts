import { action, computed, observable } from "mobx";
import { FirstPageStore } from "./FirstPageStore";
import { LoginPageStore } from "./LoginPage/LoginPageStore";
import { RouterState, RouterStore } from "mobx-state-router";
import { Routes } from "../routing/routes";
import { UserShellStore } from "./UserShellStore/UserShellStore";

type AuthHeaderKeys = "X-User-Auth";

export class CoreApi {
  private baseUrl: string;
  private fetch: (url: string, init: RequestInit) => Promise<Response>;
  constructor(baseUrl: string, customFetch?: (url: string, init: RequestInit) => Promise<Response>) {
    this.baseUrl = baseUrl;
    if (customFetch) this.fetch = customFetch;
    else this.fetch = (r, i) => fetch(r, i);
  }
  public send<T>(request: any): Promise<T> {
    return this.fetch(this.baseUrl, { method: "post", body: JSON.stringify(request) })
      .then((response) => {
        if (!response.ok) throw new Error(response.statusText);
        return response.json();
      })
      .then((jr) => {
        const r = <{ Result?: T; Exception?: string }>jr;
        if (r.Exception) throw r.Exception;
        return r.Result!;
      });
  }
}

export class SecureCoreApi extends CoreApi {
  @observable private token: string | null;
  private readonly localStorageKey;

  @computed get isAuthorized() {
    return this.token != null;
  }

  constructor(path: string, authHeaderKey: AuthHeaderKeys) {
    super(path, async (url: string, request: RequestInit) => {
      request.credentials = "same-origin";
      request.headers = {};
      if (this.token) request.headers[authHeaderKey] = this.token;
      const res = await fetch(url, request);
      if (res.status == 401) {
        window.location.reload();
        this.resetUserToken();
        await new Promise(() => {
          // Never
        });
      }
      return res;
    });
    const localStorageKey = "auth-token:" + authHeaderKey;
    this.localStorageKey = localStorageKey;
    this.token = window.localStorage.getItem(localStorageKey);
  }

  @action authorizedAjax(request: RequestInfo, init?: RequestInit) {
    const maybeInit = init ?? {};
    if (!maybeInit.headers) maybeInit.headers = {};
    maybeInit.headers = { ...maybeInit.headers, Authorization: `Bearer ${this.token}` };
    return fetch(request, maybeInit);
  }

  @action setUserToken(token: string) {
    this.token = token;
    window.localStorage.setItem(this.localStorageKey, token);
  }

  @action resetUserToken() {
    this.token = null;
    window.localStorage.removeItem(this.localStorageKey);
  }
}

export class RootStore {
  @observable routerStore = new RouterStore(this, Routes, new RouterState("not-found"));
  @observable loginPageStore = new LoginPageStore(this);
  @observable firstPageStore = new FirstPageStore(this);
  @observable userShellStore = new UserShellStore(this);
}
