export interface ApiForAnon {
  createNewAccount(): Promise<string>;
}

export class ApiForAnon {
  public createNewAccount() {}
}

export class ApiForUsers {}
