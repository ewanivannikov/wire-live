import {
  makeObservable,
  observable,
  onBecomeUnobserved,
  onBecomeObserved,
  runInAction,
  makeAutoObservable,
} from 'mobx';
import {
  QueryClient,
  MutationObserver,
  MutationObserverResult,
  DefaultError,
  MutationObserverOptions,
  MutateOptions,
  notifyManager,
} from '@tanstack/query-core';
class MobxMutation<
  TData = unknown,
  TError = DefaultError,
  TVariables = void,
  TContext = unknown,
> {
  private mutation: _MobxMutation<TData, TError, TVariables, TContext>;
  private isObserved = false;
  constructor(
    queryClient: QueryClient,
    mutationOptions: MutationObserverOptions<
      TData,
      TError,
      TVariables,
      TContext
    >,
  ) {
    this.mutation = new _MobxMutation(queryClient, mutationOptions);
    makeObservable(this, {
      // @ts-expect-error Mobx can see it don't worry
      mutation: observable.ref,
    });
    onBecomeObserved(this, 'mutation', () => {
      this.isObserved = true;
      this.mutation.setupDispoables();
    });
    onBecomeUnobserved(this, 'mutation', () => {
      this.isObserved = false;
      this.mutation.dispose();
    });
    this.mutation;
  }

  get state() {
    return this.mutation.state;
  }

  mutate(
    variables: TVariables,
    options?: MutateOptions<TData, TError, TVariables, TContext> | undefined,
  ) {
    console.log('this.isObserved', this.isObserved);

    if (!this.isObserved) {
      this.mutation.setupDispoables();
      this.mutation.mutate(variables, options);
      this.mutation.dispose();
      return;
    }
    this.mutation.mutate(variables, options);
  }

  async mutateAsync(
    variables: TVariables,
    options?: MutateOptions<TData, TError, TVariables, TContext> | undefined,
  ) {
    if (!this.isObserved) {
      this.mutation.setupDispoables();
    }
    const promise = this.mutation.mutateAsnyc(variables, options);
    const res = await promise;
    if (!this.isObserved) {
      this.mutation.dispose();
    }
    return res;
  }

  updateOptions(
    options: () => MutationObserverOptions<TData, TError, TVariables, TContext>,
  ) {
    this.mutation.updateOptions(options);
  }
}
class _MobxMutation<
  TData = unknown,
  TError = DefaultError,
  TVariables = void,
  TContext = unknown,
> {
  queryClient: QueryClient;
  _queryOptions: MutationObserverOptions<TData, TError, TVariables, TContext>;

  mObserver!: MutationObserver<TData, TError, TVariables, TContext>;
  public state!: MutationObserverResult<TData, TError, TVariables, TContext>;
  private dispoables: (() => void)[] = [];
  unsubscribe!: () => void;
  constructor(
    queryClient: QueryClient,
    mutationOptions: MutationObserverOptions<
      TData,
      TError,
      TVariables,
      TContext
    >,
  ) {
    makeAutoObservable(this);
    this.queryClient = queryClient;
    this._queryOptions = mutationOptions;
  }

  get mutationOptions() {
    return this._queryOptions;
  }

  setupDispoables() {
    this.mObserver = new MutationObserver(
      this.queryClient,
      this.wrapEffectsWithActions(this.mutationOptions),
    );
    this.state = this.mObserver.getCurrentResult();
    this.unsubscribe = this.mObserver.subscribe(
      notifyManager.batchCalls(this.update.bind(this)),
    );
  }

  mutate(
    variables: TVariables,
    options?: MutateOptions<TData, TError, TVariables, TContext> | undefined,
  ) {
    this.mObserver.mutate(variables, options);
  }

  update(state: MutationObserverResult<TData, TError, TVariables, TContext>) {
    this.state = state;
  }

  wrapEffectsWithActions(options: typeof this.mutationOptions) {
    const targets = ['onSuccess', 'onError', 'onSettled', 'onMutate'] as const;
    for (const target of targets) {
      if (options[target]) {
        const original = options[target];
        // @ts-ignore
        options[target] = (...args: any[]) => {
          runInAction(() => {
            // @ts-ignore
            original(...args);
          });
        };
      }
    }
    return options;
  }

  updateOptions(
    options: () => MutationObserverOptions<TData, TError, TVariables, TContext>,
  ) {
    this._queryOptions = options;
  }

  _updateOptions() {
    this.mObserver.setOptions(
      this.wrapEffectsWithActions(this.mutationOptions),
    );
    this.state = this.mObserver.getCurrentResult();
  }

  get mutateAsnyc() {
    return this.state.mutate;
  }

  dispose() {
    this.dispoables.forEach((fn) => fn());
  }
}

export { MobxMutation };
