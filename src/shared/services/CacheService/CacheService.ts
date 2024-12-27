import { makeAutoObservable } from 'mobx';
import { MobxQuery } from './Query';
import { QueryClient } from '@tanstack/query-core';
import { MobxMutation } from './Mutation';
const queryClientInstance = new QueryClient();
// https://github.com/sandstone991/MobQ/blob/main/README.md
export class CacheService {
  constructor(private readonly queryClient: QueryClient) {
    makeAutoObservable(this);
  }

  public createQuery = (options) => {
    return new MobxQuery(this.queryClient, options);
  };

  public createMutation = (options) => {
    return new MobxMutation(this.queryClient, options);
  };
}

export const cacheService = new CacheService(queryClientInstance);
