/**
 * @file TanstackAsyncSignalQuery.ts
 * @description This file contains the implementation of TanstackAsyncSignalQuery, a class that acts as a bridge
 * between the @tanstack/query library and the application's MobX-based reactive state management.
 */

import type {
	QueryClient,
	QueryKey,
	QueryObserverOptions,
} from "@tanstack/query-core";
import { QueryObserver } from "@tanstack/query-core";
import { runInAction } from "mobx";
import { queryClient } from "../QueryClient";
import { AsyncSignalBase, type AsyncStatus } from "./AsyncSignalBase";

const statusMap: Record<"pending" | "error" | "success", AsyncStatus> = {
	pending: "pending",
	error: "rejected",
	success: "resolved",
};

/**
 * @class TanstackAsyncSignalQuery
 * @template TQueryFnData, TError, TData, TQueryKey
 * @extends AsyncSignalBase<TData, void, TError>
 *
 * @description
 * This class solves the problem of integrating `@tanstack/query`'s advanced data fetching and caching
 * capabilities with the application's existing MobX-based reactive architecture (`AsyncSignalBase`).
 *
 * @responsibility
 * 1. **Bridge/Adapter:** It acts as a bridge between TanStack Query and MobX. It wraps a `@tanstack/query-core`
 *    `QueryObserver` to listen for state changes in a query.
 *
 * 2. **MobX-compatible Interface:** It extends `AsyncSignalBase`, providing the same observable properties
 *    (`status`, `data`, `error`) that the rest of the application's reactive architecture expects.
 *
 * 3. **State Synchronization:** It subscribes to the `QueryObserver` and automatically updates its own MobX
 *    observable properties in response to any changes (e.g., fetch, success, error, cache update).
 *
 * 4. **Architectural Cohesion:** It allows the application to leverage the powerful features of TanStack Query
 *    (caching, automatic refetching, etc.) without deviating from the established entity-based architecture,
 *    where data logic is encapsulated in classes that use MobX-powered signals. This is crucial for
 *    interoperability with Solid.js components that are already configured to react to MobX state changes
 *    via `enableExternalSource`.
 */
export class TanstackAsyncSignalQuery<
	TQueryFnData = unknown,
	TError = unknown,
	TData = TQueryFnData,
	TQueryKey extends QueryKey = QueryKey,
> extends AsyncSignalBase<TData, void, TError> {
	private readonly observer: QueryObserver<
		TQueryFnData,
		TError,
		TData,
		TQueryKey
	>;
	private readonly unsubscribe: () => void;

	constructor(
		options: QueryObserverOptions<TQueryFnData, TError, TData, TQueryKey>,
		private readonly _queryClient: QueryClient
	) {
		// We pass a dummy asyncFn to the base class because the actual async logic
		// is handled by TanStack Query.
		super(() => new Promise(() => {}));

		this.observer = new QueryObserver(this._queryClient, options);

		// Set initial state from the observer's current result.
		const initialResult = this.observer.getCurrentResult();
		this.status = statusMap[initialResult.status];
		this.data = initialResult.data ?? null;
		this.error = initialResult.error ?? null;

		// Subscribe to the observer to keep the MobX state in sync with TanStack Query state.
		this.unsubscribe = this.observer.subscribe((result) => {
			runInAction(() => {
				this.status = statusMap[result.status];
				this.data = result.data ?? null;
				this.error = result.error ?? null;
			});
		});
	}

	/**
	 * Triggers a refetch of the query.
	 * Overrides the base class's execute method to map to TanStack Query's refetching.
	 */
	execute(): void {
		this.observer.refetch();
	}

	/**
	 * Disposes of the subscription to the query observer.
	 * This should be called when the signal is no longer needed to prevent memory leaks.
	 */
	dispose() {
		this.unsubscribe();
	}

	/**
	 * Alias for dispose. Cancels the subscription.
	 */
	cancel(): void {
		this.dispose();
	}
}

export const createAsyncSignalQuery = <
	TQueryFnData = unknown,
	TError = unknown,
	TData = TQueryFnData,
	TQueryKey extends QueryKey = QueryKey,
>(options: QueryObserverOptions<TQueryFnData, TError, TData, TQueryKey>) => new TanstackAsyncSignalQuery(options, queryClient)
