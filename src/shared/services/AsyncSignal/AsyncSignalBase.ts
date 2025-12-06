import { action, makeObservable, observable } from "mobx";

export type AsyncStatus = "pending" | "error" | "success";

export class AsyncSignalBase<TData, TInput, TError = unknown> {
	@observable accessor status: AsyncStatus;
	@observable accessor data: TData | null;
	@observable accessor error: TError | null;

	#controllerRef: { current: AbortController | null };

	constructor(
		private asyncFn: (input: TInput) => Promise<TData>,
		initialState?: {
			status: AsyncStatus;
			data: TData | null;
			error: TError | null;
		},
	) {
		makeObservable(this);
		this.status = initialState?.status ?? "pending";
		this.data = initialState?.data ?? null;
		this.error = initialState?.error ?? null;

		this.#controllerRef = { current: null };
	}

	// Метод, общий для выполнения запроса/команды
	@action
	protected async _execute(input: TInput): Promise<void> {
		if (this.#controllerRef.current) {
			this.#controllerRef.current.abort();
		}
		const controller = new AbortController();
		this.#controllerRef.current = controller;

		this.status = "pending";
		this.data = null;
		this.error = null;

		try {
			if (controller.signal.aborted) throw new Error("Operation was cancelled");
			const result = await this.asyncFn(input);
			if (controller.signal.aborted) throw new Error("Operation was cancelled");
			this.status = "success";
			this.data = result;
			this.error = null;
		} catch (err) {
			if (err instanceof Error && err.name === "AbortError") return;
			this.status = "error";
			this.data = null;
			this.error = err as TError;
		} finally {
			if (this.#controllerRef.current === controller) {
				this.#controllerRef.current = null;
			}
		}
	}

	@action
	protected _cancel(): void {
		if (this.#controllerRef.current) {
			this.#controllerRef.current.abort();
			this.#controllerRef.current = null;
		}
	}
}
