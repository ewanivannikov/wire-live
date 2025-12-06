import { AsyncSignalBase } from "./AsyncSignalBase";

export class AsyncSignalQuery<TData, TParams = void, TError = unknown> extends AsyncSignalBase<TData, TParams, TError> {
  private static _empty?: AsyncSignalQuery<any, any, any>;

  public static get empty() {
    if (!this._empty) {
      this._empty = new AsyncSignalQuery(() => Promise.resolve(null), {
        status: 'resolved',
        data: null,
        error: null,
      });
    }
    return this._empty;
  }
  
  constructor(
    queryFn: (params: TParams) => Promise<TData>,
    initialState?: { status: 'pending' | 'rejected' | 'resolved'; data: TData | null; error: TError | null }
  ) {
    super(queryFn, initialState); // Передаем функцию в базовый класс
  }

  // Публичный метод execute, специфичный для запроса
  execute(params: TParams): void {
    // Вызываем внутренний метод базового класса
    this._execute(params);
  }

  cancel(): void {
    this._cancel();
  }
}
