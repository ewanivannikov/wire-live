import { createEffect, type JSXElement } from 'solid-js';
import styles from './drawer.module.css';
import { createDrawerLogic } from './DrawerLogic';
const { root, toggler } = styles;

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
      <button
        class={toggler}
        ref={toggle}
        >
        X
      </button>
      <div 
      class={root}
      classList={props.classList}
      ref={element}
      popover="manual"
      style={{ "max-width": props.size }}>
        {props.children}
      </div>
    </>
  );
};
