import { container, header, sidebar, context, main } from './layout.module.css';

import { Toolbar } from '../toolbar';
import { ContextBar } from '../contextBar';

export function Layout(props) {
  return (
    <div class={container}>
      <header class={header}>Wire live</header>
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
