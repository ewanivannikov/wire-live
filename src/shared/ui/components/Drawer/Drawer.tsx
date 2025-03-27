import { createEffect, type JSXElement } from 'solid-js';
import styles from './drawer.module.css';
import { createDrawerLogic } from './DrawerLogic';
import { Button } from '../Button';
const { root } = styles;

export type DrawerProps = {
  open?: boolean;
  size?: string;
  classList?: Record<string, boolean>;
  children: JSXElement;
};
export const Drawer = (props: DrawerProps) => {
  let element!: HTMLElement;

  createEffect(() => {
    const state = createDrawerLogic(element, props);
    if (!props.open) {
      state.close();
    }
  }, null);

  return (
    <div 
    class={root}
    classList={props.classList}
    ref={element}
    popover="manual"
    style={{ width: props.size }}>
      <button>
        X
      </button>
      {props.children}
    </div>
  );
};
