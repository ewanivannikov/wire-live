import { onCleanup, useContext, onMount } from 'solid-js';
import { createWorld } from '../../modules/mapContainer';
import { WorldState } from '../../modules/worldState/viewModel';
import { WorldStateContext } from '../../modules/worldState/WorldStateContext';
import { createCanvas } from './presenter';
import { World } from '../../modules/mapContainer/World';
import { logger } from '../../shared/services/LoggerService';

export const Canvas = () => {
  let ref: HTMLDivElement;
  let world: World

  const worldState = useContext<WorldState>(WorldStateContext);

  onMount(async () => {
    const map = await createCanvas().getMap();

    const wrld = createWorld(ref, map, worldState);
    world = wrld
    wrld.render(); 
  });

  onCleanup(() => {
    world.dispose()
    logger.debug('Canvas: CleanedUp');
  });
  
  return <div id="canvas" ref={ref} />;
};
