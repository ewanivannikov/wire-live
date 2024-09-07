import styles from './layout.module.css';

import { Toolbar } from '../toolbar';
import { ContextBar } from '../contextBar';
import logo from '../../assets/logo.svg';

const { container, header, sidebar, context, main } = styles;

export function Layout(props) {
  return (
    <div class={container}>
      <header class={header}>
        <img src={logo} alt="" width="50px" srcset="" />
        Wire live
        <a href="/wire-live/about">О проекте</a>
      </header>
      <aside class={sidebar}>
        <Toolbar />
      </aside>
      <div class={context}>
        <ContextBar />
      </div>
      <main class={main}>{props.children}</main>
    </div>
  );
}
