import { container, header, landingMain } from './layout.module.css';

import logo from '../../assets/logo.svg';
import './tokens.css';

export function LayoutLanding(props) {
  return (
    <div class={container}>
      <header class={header}><img src={logo} alt="" width="50px" srcset="" />
        Wire live
      </header>
      <main class={landingMain}>{props.children}</main>
    </div>
  );
}
