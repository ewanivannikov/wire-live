import styles from './layout.module.css';

import logo from '../../assets/logo.svg';
import { Show } from 'solid-js';
import { routerService } from '../../shared/services';
import { Profile } from '../profile';
import '../../shared/ui/components/Button';
import { profilePresenter } from '../profile/presenter';

const { container, header, sidebar, context, main, nav } = styles;

export function Layout(props) {
  const { asideSlot, contextBarSlot } = props;
  const logOut = () => {
    profilePresenter.logOut();
  }
  return (
    <div class={container}>
      <header class={header}>
        <nav class={nav}>
          <a href={`${routerService.basename}`}>
            <img src={logo} alt="" width="50px" srcset="" />
          </a>
          <a href={`${routerService.basename}`}>
            Wire live
          </a>
          <a href={`${routerService.basename}#/about`}>О проекте</a>
          <Profile />
          <button-wl onClick={logOut}>Выйти</button-wl>
        </nav>
      </header>
      <Show when={Boolean(asideSlot)}>
        <aside class={sidebar}>
          {asideSlot}
        </aside>
      </Show>
      <Show when={Boolean(asideSlot)}>
        <div class={context}>
          {contextBarSlot}
        </div>
      </Show>
      <main class={main}>{props.children}</main>
    </div>
  );
}
