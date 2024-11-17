import { render } from 'solid-js/web';
import {
  createEffect,
  createSignal,
  enableExternalSource,
  ErrorBoundary,
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
import {registerServiceWorker} from './shared';
import { StateBulkCheckingModal } from './modules/worldState/StateBulkChecking/view';

registerServiceWorker();

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
  const [pathname, setPathname] = createSignal(routerService.location.pathname)

  routerService.onNavigate((e) => {
    setPathname(routerService.location.pathname)
  });

  createEffect(() => {
    if (
      pathname().includes('home') ||
      pathname().includes('about')
    ) {
      const theme = document.querySelector('#theme');
      if (theme) {
        theme.href = './static/warm.variables.css';
      }
    }
    if (pathname().includes('levels')) {
      const theme = document.querySelector('#theme');
      if (theme) {
        theme.href = './static/light.variables.css';
      }
    }
  }, null);

  return (
    <ErrorBoundary fallback={(err, reset) => <div onClick={reset}>Error: {err.toString()}</div>}>
    <Switch fallback={<div>Not Found</div>}>
      <Match when={pathname().includes('levels')}>
        <Layout asideSlot={<Toolbar />} contextBarSlot={<ContextBar />}>
          <TaskPanel />
          <StateBulkCheckingModal />
          <Canvas />
        </Layout>
      </Match>
      <Match
        when={pathname().includes('home')}
      >
        <LayoutLanding>
          <Home />
        </LayoutLanding>
      </Match>
      <Match
        when={pathname().includes('about')}
      >
        <LayoutLanding>
          <About />
        </LayoutLanding>
      </Match>
      <Match when={pathname() === '/'}>
        <Layout>
          <LevelList />
        </Layout>
      </Match>
    </Switch>
    </ErrorBoundary>
  );
};
render(() => <App />, document.getElementById('app'));
