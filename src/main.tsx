import { render } from 'solid-js/web';
import { createMemo } from 'solid-js';
import { Layout } from './modules/layout';
import { fork } from 'effector';
import { Provider } from 'effector-solid';
import { createIsMounted } from '@solid-primitives/lifecycle';
import './main.css';
import { init } from './modules/mapContainer';

const scope = fork();

function App() {
  let ref: HTMLDivElement;
  const isMounted = createIsMounted();
  createMemo(() => {
    if (isMounted()) {
      init(ref);
    }
  });

  return (
    <Provider value={scope}>
      <Layout>
        <div id="canvas" ref={ref} />
      </Layout>
    </Provider>
  );
}
render(() => <App />, document.getElementById('app'));
