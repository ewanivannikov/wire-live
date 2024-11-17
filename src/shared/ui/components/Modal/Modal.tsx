import { createEffect, type JSXElement } from 'solid-js';
import styles from './modal.module.css';
import { createModalLogic } from './ModalLogic';
const { root } = styles;

export type ModalProps = {
  open?: boolean;
  classList?: Record<string, boolean>;
  children: JSXElement;
}
export const Modal = (props: ModalProps) => {
  let element!: HTMLDialogElement;

  createEffect(() => {
    createModalLogic(element, props);
  }, null);

  return (
    <dialog
      class={root}
      classList={props.classList}
      ref={element}
    >
      {props.children}
    </dialog>
  );
};
