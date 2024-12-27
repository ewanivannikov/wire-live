import styles from './layout.module.css';

import logo from '../../assets/logo.svg';
import { routerService } from '../../shared/services';

const { container, header, landingMain, nav } = styles;

export function LayoutLanding(props) {
  return (
    <div class={container}>
      <header class={header}>
        <nav class={nav}>
          <a href={`${routerService.basename}`}>
            <img src={logo} alt="" width="50px" srcset="" />
          </a>
          <a href={`${routerService.basename}`}>Wire live</a>
          <a href={`${routerService.basename}#/about`}>О проекте</a>
        </nav>
      </header>
      <main class={landingMain}>{props.children}</main>
    </div>
  );
}
