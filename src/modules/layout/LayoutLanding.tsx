import styles from './layout.module.css';

import logo from '../../assets/logo.svg';
import './tokens.css';

const { container, header, landingMain } = styles;

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
