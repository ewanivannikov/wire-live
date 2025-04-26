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
import { registerServiceWorker } from './shared';
import { StateBulkCheckingModal } from './modules/worldState/StateBulkChecking/view';
import { WorldStateProvider } from './modules/worldState/WorldStateProvider';
import Clarity from '@microsoft/clarity';
import { SandboxList } from './pages/SandboxList/SandboxList';

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
if (!window.location.host.includes('localhost')) {
  Clarity.init('qllcpogzor');
}


const App = () => {
  const [pathname, setPathname] = createSignal(routerService.location.pathname);

  routerService.onNavigate((e) => {
    setPathname(e.target.location.hash.slice(1));
  });

  createEffect(() => {
    if (
      routerService.matchPath('/about', pathname()) || 
      routerService.matchPath('/home', pathname()) ||
      routerService.matchPath('/', pathname())
    ) {
      const theme = document.querySelector('#theme');
      if (theme) {
        theme.href = './static/warm.variables.css';
      }
    }
    if (pathname().includes('levels') || pathname().includes('sandbox') || pathname().includes('editor')) {
      const theme = document.querySelector('#theme');
      if (theme) {
        theme.href = './static/light.variables.css';
      }
    }
  }, null);

  return (
    <ErrorBoundary
      fallback={(err, reset) => (
        <div onClick={reset}>Error: {err.toString()}</div>
      )}
    >
      <Switch fallback={<div>Not Found</div>}>
        <Match when={routerService.matchPath('/levels/:levelId', pathname())}>
          <WorldStateProvider>
            <Layout asideSlot={<Toolbar />} contextBarSlot={<ContextBar />}>
              <TaskPanel />
              <StateBulkCheckingModal />
              <Canvas />
            </Layout>
          </WorldStateProvider>
        </Match>
        <Match when={pathname().includes('editor')}>
          <WorldStateProvider>
            <Layout asideSlot={<Toolbar />} contextBarSlot={<ContextBar />}>
              <Canvas />
            </Layout>
          </WorldStateProvider>
        </Match>
        <Match when={routerService.matchPath('/sandboxes/:sandboxId', pathname())}>
          <WorldStateProvider>
            <Layout asideSlot={<Toolbar />} contextBarSlot={<ContextBar />}>
              <Canvas />
            </Layout>
          </WorldStateProvider>
        </Match>
        <Match when={pathname().includes('about')}>
          <LayoutLanding>
            <About />
          </LayoutLanding>
        </Match>
        <Match when={routerService.matchPath('/home', pathname())}>
          <LayoutLanding>
            <Home />
          </LayoutLanding>
        </Match>
        <Match when={routerService.matchPath('/levels', pathname())}>
          <Layout>
            <LevelList />
          </Layout>
        </Match>
        <Match when={routerService.matchPath('/sandboxes', pathname())}>
          <Layout>
            <SandboxList />
          </Layout>
        </Match>
        <Match when={pathname() === '/' || pathname() === '#/'}>
          <Layout>
            <Home />
          </Layout>
        </Match>
      </Switch>
    </ErrorBoundary>
  );
};
render(() => <App />, document.getElementById('app'));
