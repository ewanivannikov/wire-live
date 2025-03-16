import { createIsMounted } from '@solid-primitives/lifecycle';
import { createMemo, onCleanup, useContext } from 'solid-js';
import { createWorld } from '../modules/mapContainer';
import { routerService } from '../shared/services';
import { levelRepository } from '../data';
import { solutionRepository } from '../data/repositories/SolutionRepository/SolutionRepository';
import { WorldState } from '../modules/worldState/viewModel';
import { WorldStateContext } from '../modules/worldState/WorldStateContext';

export const Canvas = () => {
  let ref: HTMLDivElement;
  const isMounted = createIsMounted();

  const worldState = useContext<WorldState>(WorldStateContext);

  createMemo(() => {
    if (isMounted()) {
      const isLevels = routerService.location.pathname.includes('levels');
      const levelId = routerService.params.levelId;
      const userId = '1';
      const hasSolutions = solutionRepository.checkSolutions(levelId, userId);
      let mapSolution = [];
      
      
      if (hasSolutions) {
        mapSolution = solutionRepository.getDraft(levelId, userId).map
      };

      let map = [];

      if (isLevels) {
      map = levelRepository
        .getLevelById(levelId)
        .map.concat(mapSolution);
      }

      const world = createWorld(ref, map, worldState);
      world.render();
      onCleanup(() => {
        world.dispose()
      });
    }
    
  });
  
  return <div id="canvas" ref={ref} />;
};
