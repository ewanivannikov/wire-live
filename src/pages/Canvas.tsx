import { createIsMounted } from '@solid-primitives/lifecycle';
import { createMemo } from 'solid-js';
import { createWorld } from '../modules/mapContainer';
import { routerService } from '../shared/services';
import { levelRepository } from '../data';
import { solutionRepository } from '../data/repositories/SolutionRepository/SolutionRepository';

export const Canvas = () => {
  let ref: HTMLDivElement;
  const isMounted = createIsMounted();
  createMemo(() => {
    if (isMounted()) {
      const levelId = routerService.params.levelId;
      const userId = '1';
      const hasSolutions = solutionRepository.checkSolutions(levelId, userId);
      let mapSolution = [];
      
      
      if (hasSolutions) {mapSolution = solutionRepository.getDraft(levelId, userId).map};

      const map = levelRepository
        .getLevelById(levelId)
        .map.concat(mapSolution);
        console.log('map', map);
      const world = createWorld(ref, map);
      world.render();
    }
  });
  return <div id="canvas" ref={ref} />;
};
