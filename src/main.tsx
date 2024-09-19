import { render } from 'solid-js/web';
import {
  createEffect,
  createSignal,
  enableExternalSource,
  Match,
  Switch,
} from 'solid-js';
import { Layout, LayoutLanding } from './modules/layout';

import './main.css';
import { Reaction } from 'mobx';
import { routerService } from './shared/services/RouterService/RouterService';
import { About, Canvas, Home, LevelList } from './pages';
import { Toolbar } from './modules/toolbar';
import { ContextBar } from './modules/contextBar';
import { TaskPanel } from './modules/taskPanel';

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
routerService.init();

const App = () => {
  const [hash, setHash] = createSignal(routerService.location.hash)
  const [pathname, setPathname] = createSignal(routerService.location.pathname)

  routerService.onNavigate((e) => {
    setHash(e.target.location.hash)
    setPathname(e.target.location.pathname)
  });

  createEffect(() => {
    if (
      hash() === `#/home` ||
      hash() === `#/about`
    ) {
      const theme = document.querySelector('#theme');
      if (theme) {
        theme.href = './static/warm.variables.css';
      }
    }
    if (hash().includes('levels')) {
      const theme = document.querySelector('#theme');
      if (theme) {
        theme.href = './static/light.variables.css';
      }
    }
  }, null);

  return (
    <Switch fallback={<div>Not Found</div>}>
      <Match when={hash().includes('levels')}>
        <Layout asideSlot={<Toolbar />} contextBarSlot={<ContextBar />}>
          <TaskPanel />
          <Canvas />
        </Layout>
      </Match>
      <Match
        when={hash() === `#/home`}
      >
        <LayoutLanding>
          <Home />
        </LayoutLanding>
      </Match>
      <Match
        when={hash() === `#/about`}
      >
        <LayoutLanding>
          <About />
        </LayoutLanding>
      </Match>
      <Match when={pathname() === routerService.basename}>
        <Layout>
          <LevelList />
        </Layout>
      </Match>
    </Switch>
  );
};
render(() => <App />, document.getElementById('app'));
