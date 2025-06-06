import {
  observable,
  onBecomeUnobserved,
  onBecomeObserved,
  makeAutoObservable,
} from 'mobx';
import {
  DefaultError,
  QueryClient,
  QueryKey,
  QueryObserver,
  QueryObserverOptions,
  QueryObserverResult,
  notifyManager,
} from '@tanstack/query-core';

class MobxQuery<
  TQueryFnData = unknown,
  TError = DefaultError,
  TData = TQueryFnData,
  TQueryData = TQueryFnData,
  TQueryKey extends QueryKey = QueryKey,
> {
  private query: _MobxQuery<TQueryFnData, TError, TData, TQueryData, TQueryKey>;
  constructor(
    private readonly queryClient: QueryClient,
    queryOptions: QueryObserverOptions<
      TQueryFnData,
      TError,
      TData,
      TQueryData,
      TQueryKey
    >,
  ) {
    this.query = new _MobxQuery(this.queryClient, queryOptions);
    makeAutoObservable(this, {
      // @ts-expect-error Mobx can see it don't worry
      query: observable.ref,
    });
    onBecomeObserved(this, 'query', () => {
      this.query.setupDispoables();
    });
    onBecomeUnobserved(this, 'query', () => {
      this.query.dispose();
    });
  }

  get state() {
    return this.query.state || {};
  }

  public refetch = () => {
    return this.query.refetch();
  };
}
class _MobxQuery<
  TQueryFnData = unknown,
  TError = DefaultError,
  TData = TQueryFnData,
  TQueryData = TQueryFnData,
  TQueryKey extends QueryKey = QueryKey,
> {
  public qObserver: QueryObserver<
    TQueryFnData,
    TError,
    TData,
    TQueryData,
    TQueryKey
  > = {};

  public state!: QueryObserverResult<TData, TError> = {};
  private dispoables: (() => void)[] = [];
  unsubscribe!: () => void;
  constructor(
    private readonly queryClient: QueryClient,
    private queryOptions: QueryObserverOptions<
      TQueryFnData,
      TError,
      TData,
      TQueryData,
      TQueryKey
    >,
  ) {
    makeAutoObservable(this, {}, { autoBind: true });
  }

  get options() {
    return this.queryOptions;
  }

  public setupDispoables() {
    this.qObserver = new QueryObserver(this.queryClient, this.options);
    this.state = this.qObserver.getCurrentResult();
    this.unsubscribe = this.qObserver.subscribe(
      notifyManager.batchCalls(this.onStoreChange),
    );
    this.qObserver.updateResult();
  }

  public refetch() {
    // this.qObserver.refetch();
    return this.queryClient.ensureQueryData(this.options).then((res) => {
      return res;
    });
  }

  private onStoreChange = (res) => {
    this.state = res;
  };

  updateOptions(
    options: () => QueryObserverOptions<
      TQueryFnData,
      TError,
      TData,
      TQueryData,
      TQueryKey
    >,
  ) {
    this.queryOptions = options;
  }

  _updateOptions() {
    this.qObserver.setOptions(this.options);
  }

  dispose() {
    this.dispoables.forEach((fn) => fn());
  }
}

export { MobxQuery };
