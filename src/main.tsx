import { render } from 'solid-js/web';
import { createMemo, enableExternalSource } from 'solid-js';
import { Layout } from './modules/layout';

import { createIsMounted } from '@solid-primitives/lifecycle';
import './main.css';
import { createWorld } from './modules/mapContainer';
import { Reaction } from 'mobx';
// const paintUrl = new URL('./shared/gline.js', import.meta.url)
// CSS.paintWorklet.addModule(paintUrl)

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
    <Layout>
      <div id="canvas" ref={ref} />
    </Layout>
  );
}
render(() => <App />, document.getElementById('app'));
