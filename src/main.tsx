import { render } from 'solid-js/web';
import { createMemo, enableExternalSource, Match, Switch } from 'solid-js';
import { Layout , LayoutLanding } from './modules/layout';

import { createIsMounted } from '@solid-primitives/lifecycle';
import './main.css';
import { createWorld } from './modules/mapContainer';
import { Reaction } from 'mobx';
import { routerService } from './shared/services/RouterService/RouterService';
import { Home } from './pages';


const rippleUrl = new URL('./shared/ui/ripple', import.meta.url)
if ('paintWorklet' in CSS) {
    CSS.paintWorklet.addModule(rippleUrl)
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

  return (
    
      <Switch fallback={<div>Not Found</div>}>
        <Match when={routerService.location.pathname === routerService.basename}>
          <Layout>
            <div id="canvas" ref={ref} />
          </Layout>
        </Match>
        <Match 
          when={routerService.location.pathname === `${routerService.basename}home`}
        >
          <LayoutLanding>
            <Home />
          </LayoutLanding>
        </Match>
      </Switch>
      
    
  );
}
render(() => <App />, document.getElementById('app'));
