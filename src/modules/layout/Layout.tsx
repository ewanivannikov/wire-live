import styles from './layout.module.css';

import logo from '../../assets/logo.svg';
import { JSX, Show } from 'solid-js';
import { routerService } from '../../shared/services';
import { Profile } from '../profile';

const { container, header, sidebar, context, main, nav } = styles;

type LayoutProps = {
  children?: JSX.Element;
  asideSlot?: JSX.Element;
  contextBarSlot?: JSX.Element;
};

export function Layout(props: LayoutProps) {
  return (
    <div class={container}>
      <header class={header}>
        <nav class={nav}>
          <a href={`${routerService.basename}`}>
            <img src={logo} alt="" width="50px" srcset="" />
          </a>
          <a href={`${routerService.basename}`}>Wire live</a>
          <a href={`${routerService.basename}#/about`}>О проекте</a>
          <Profile />
        </nav>
      </header>
      <Show when={Boolean(props.asideSlot)}>
        <aside class={sidebar}>{props.asideSlot}</aside>
      </Show>
      <Show when={Boolean(props.asideSlot)}>
        <div class={context}>{props.contextBarSlot}</div>
      </Show>
      <main class={main}>{props.children}</main>
    </div>
  );
}
