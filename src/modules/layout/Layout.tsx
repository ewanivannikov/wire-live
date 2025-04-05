import styles from './layout.module.css';

import logo from '../../assets/logo.svg';
import { JSX, Show } from 'solid-js';
import { routerService } from '../../shared/services';
import { Profile } from '../profile';
import { LinkRouter } from '../../shared/ui/components/LinkRouter';
import { Drawer } from '../../shared/ui/components/Drawer';

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
          <LinkRouter to={`/`}>
            <img src={logo} alt="Wire-live logo" width="50px" style="pointer-events: none;" />
          </LinkRouter>
          <LinkRouter to={`/`}>Wire live</LinkRouter>
          <LinkRouter to={`/about`}>О проекте</LinkRouter>
          <Profile />
        </nav>
      </header>
      {/* <Drawer open={true} size="300px">
        Drawer
        Lorem, ipsum dolor sit amet consectetur adipisicing elit. Eveniet sed soluta vitae amet veniam obcaecati blanditiis odio, molestiae suscipit. Animi labore dolor, neque facilis corporis soluta tempore incidunt blanditiis totam?
        Lorem, ipsum dolor sit amet consectetur adipisicing elit. Eveniet sed soluta vitae amet veniam obcaecati blanditiis odio, molestiae suscipit. Animi labore dolor, neque facilis corporis soluta tempore incidunt blanditiis totam?
        Lorem, ipsum dolor sit amet consectetur adipisicing elit. Eveniet sed soluta vitae amet veniam obcaecati blanditiis odio, molestiae suscipit. Animi labore dolor, neque facilis corporis soluta tempore incidunt blanditiis totam?
      </Drawer> */}
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
