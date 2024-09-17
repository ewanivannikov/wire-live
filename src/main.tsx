import { render } from 'solid-js/web';
import {
  createEffect,
  createMemo,
  enableExternalSource,
  Match,
  Switch,
} from 'solid-js';
import { Layout, LayoutLanding } from './modules/layout';

import { createIsMounted } from '@solid-primitives/lifecycle';
import './main.css';
import { createWorld } from './modules/mapContainer';
import { Reaction } from 'mobx';
import { routerService } from './shared/services/RouterService/RouterService';
import { About, Home } from './pages';

const rippleUrl = new URL('./shared/ui/ripple.worklet', import.meta.url);
if ('paintWorklet' in CSS) {
  CSS.paintWorklet.addModule(rippleUrl);
}

const enableMobXWithSolidJS = () => {
  let id = 0;
  enableExternalSource((fn, trigger) => {
    const reaction = new Reaction(`externalSource@${++id}`, trigger);
    return {
      track: (x) => {
        let next;
        reaction.track(() => (next = fn(x)));
        return next;
      },
      dispose: () => {
        reaction.dispose();
      },
    };
  });
};

enableMobXWithSolidJS();

function App() {
  let ref: HTMLDivElement;
  const isMounted = createIsMounted();
  createMemo(() => {
    if (isMounted()) {
      const world = createWorld(ref);
      world.render();
    }
  });

  createEffect(() => {
    if (
      routerService.location.pathname === `${routerService.basename}home` ||
      routerService.location.pathname === `${routerService.basename}about`
    ) {
      const theme = document.querySelector('#theme');
      if (theme) {
        theme.href = './static/warm.variables.css';
      }
    }
  }, null);

  return (
    <Switch fallback={<div>Not Found</div>}>
      <Match when={routerService.location.pathname === routerService.basename}>
        <Layout>
          <div id="canvas" ref={ref} />
        </Layout>
      </Match>
      <Match
        when={
          routerService.location.pathname === `${routerService.basename}home`
        }
      >
        <LayoutLanding>
          <Home />
        </LayoutLanding>
      </Match>
      <Match
        when={
          routerService.location.pathname === `${routerService.basename}about`
        }
      >
        <LayoutLanding>
          <About />
        </LayoutLanding>
      </Match>
    </Switch>
  );
}
render(() => <App />, document.getElementById('app'));
