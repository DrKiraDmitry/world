﻿import { action, computed, observable } from "mobx";

type AuthHeaderKeys = "X-User-Auth";

export class SecureCoreApi {
  @observable private token: string | null;
  private baseUrl: string;
  private readonly localStorageKey;

  @computed get isAuthorized() {
    return this.token != null;
  }

  constructor(baseUrl: string, authHeaderKey: AuthHeaderKeys) {
    this.baseUrl = baseUrl;
    const localStorageKey = "auth-token:" + authHeaderKey;
    this.localStorageKey = localStorageKey;
    this.token = window.localStorage.getItem(localStorageKey);
  }

  public send<T>(path: string, body?: T, method?: string, headers?: Headers) {
    return fetch(`${this.baseUrl}${path}`, {
      method: method ? method : "POST",
      body: body ? JSON.stringify(body) : null,
      headers: headers
        ? headers
        : {
            "Content-Type": "application/json",
          },
    })
      .then((r) => r.json())
      .catch((e) => e);
  }

  @action async authorized(data: any) {
    try {
      const r = await this.send("/login", data);
      window.localStorage.setItem("auth-token:X-User-Auth", r.token);
      this.token = r.token;
      return r;
    } catch (e) {
      console.log(e);
    }
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

export class LocalStoreChanger {
  @observable thief =
    window.localStorage.getItem("Thief") === null ? null : Boolean(window.localStorage.getItem("Thief"));
  constructor() {}
  @action localThief(x: boolean) {
    this.thief = x;
    window.localStorage.setItem("Thief", x.toString());
  }
  @action clear() {
    window.localStorage.clear();
    this.thief = null;
  }
}
