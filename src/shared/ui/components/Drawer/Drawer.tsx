import { createEffect, type JSXElement } from 'solid-js';
import styles from './drawer.module.css';
import { createDrawerLogic } from './DrawerLogic';
import { Button } from '../Button';
const { root, toggle } = styles;

export type DrawerProps = {
  open?: boolean;
  size?: string;
  classList?: Record<string, boolean>;
  children: JSXElement;
};
export const Drawer = (props: DrawerProps) => {
  let element!: HTMLElement;
  let toggle!: HTMLButtonElement;

  createEffect(() => {
    const state = createDrawerLogic(element, toggle, props);
    if (!props.open) {
      state.close();
    }
  }, null);

  return (
    <>
    <div 
    class={root}
    classList={props.classList}
    ref={element}
    popover="manual"
    style={{ width: props.size }}>
      {props.children}
    </div>
    <button
    class={toggle}
    ref={toggle}
    {...props}
    >
    X
  </button>
  </>
  );
};
