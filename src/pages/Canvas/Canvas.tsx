import { createIsMounted } from '@solid-primitives/lifecycle';
import { createMemo, onCleanup, useContext } from 'solid-js';
import { createWorld } from '../../modules/mapContainer';
import { WorldState } from '../../modules/worldState/viewModel';
import { WorldStateContext } from '../../modules/worldState/WorldStateContext';
import { createCanvas } from './presenter';

export const Canvas = () => {
  let ref: HTMLDivElement;
  const isMounted = createIsMounted();

  const worldState = useContext<WorldState>(WorldStateContext);

  createMemo(() => {
    if (isMounted()) {
      const map = createCanvas().map
      const world = createWorld(ref, map, worldState);
      world.render();
      onCleanup(() => {
        world.dispose()
      });
    }
    
  });
  
  return <div id="canvas" ref={ref} />;
};
