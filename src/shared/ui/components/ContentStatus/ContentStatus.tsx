import { createEffect, Show } from "solid-js";

export type ContentStatusProps = {
  status: 'pending' | 'error' | 'success';
  error?: AggregateError;
  children: JSX.Element;
}

export const ContentStatus = (props: ContentStatusProps) => {
  return (
    <>
      <Show when={props.status === 'pending'}>
        Загрузка...
      </Show>
      < Show when={props.status === 'error'}>
        ❌ {props.error.message}
      </Show>
      < Show when={props.status === 'success'}>
        {props.children}
      </Show>
    </>
  );
}
