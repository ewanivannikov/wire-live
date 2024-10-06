import { makeAutoObservable } from "mobx";
import { MobxQuery } from "./Query";
import { QueryClient } from "@tanstack/query-core";
const queryClientInstance = new QueryClient();

export class CacheService {
  constructor(private readonly queryClient: QueryClient) {
    makeAutoObservable(this);
  }

  public createQuery = (options) => {
    return new MobxQuery(this.queryClient, options);
  }
}

export const cacheService = new CacheService(queryClientInstance);


