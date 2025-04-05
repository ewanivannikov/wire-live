import { createEffect, type JSXElement } from 'solid-js';
import styles from './drawer.module.css';
import { createDrawerLogic } from './DrawerLogic';
import { Menu } from 'lucide-solid';
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
      <div 
      class={root}
      classList={props.classList}
      ref={element}
      popover="manual"
      style={{ "--drawer-size": props.size }}>
        {props.children}
      </div>
      <button
        class={toggler}
        ref={toggle}
        style={{ "--drawer-size": props.size }}
        >
        <Menu />
      </button>
    </>
  );
};
