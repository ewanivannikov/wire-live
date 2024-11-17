import { createEffect, type JSXElement } from 'solid-js';
import styles from './modal.module.css';
import { createModalLogic } from './ModalLogic';
const { root, title } = styles;

export type ModalProps = {
  title?: string;
  open?: boolean;
  classList?: Record<string, boolean>;
  children: JSXElement;
}
export const Modal = (props: ModalProps) => {
  let element!: HTMLDialogElement;


  createEffect(() => {
    const state =createModalLogic(element, props);
    if (!props.open) {
      state.close();
    }
  }, null);

  return (
    <dialog
      class={root}
      classList={props.classList}
      ref={element}
    >
      {props.title && <h1 class={title}>{props.title}</h1>}
      {props.children}
    </dialog>
  );
};
