import { makeAutoObservable } from 'mobx';
import { SandboxRepository, sandboxRepository } from '../../data/repositories/SandboxRepository';
import { routerService } from '../../shared';
import { LevelRepository, levelRepository } from '../../data';
import { SolutionRepository, solutionRepository } from '../../data/repositories/SolutionRepository/SolutionRepository';

export class CanvasPres {
  constructor(
    private readonly router: RouterService,
    private readonly sandboxRepository: SandboxRepository,
    private readonly levelRepository: LevelRepository,
    private readonly solutionRepository: SolutionRepository
  ) {
    makeAutoObservable(this);
  }

  public get state() {
    const state= this.query.state;
    console.log('state', state);
    
    return state
  }

  public get map() {
    const isLevels = this.router.matchPath('/levels/:levelId', this.router.location.pathname);
      const levelId = this.router.params.levelId;
      const isSandbox = this.router.matchPath('/sandboxes/:sandboxId', this.router.location.pathname);
      
      const userId = '1';
      const hasSolutions = this.solutionRepository.checkSolutions(levelId, userId);
      let mapSolution = [];
      
      
      if (hasSolutions) {
        mapSolution = this.solutionRepository.getDraft(levelId, userId).map
      };

      let map = [];

      if (isLevels) {
      map = this.levelRepository
        .getLevelById(levelId)
        .map.concat(mapSolution);
      }

      // if (isLevels) {
      //   const patternMap = this.levelQuery.state.data.patternArrowCache;
      //   const baseMap = this.levelQuery.state.data.baseCache;
      //   map = baseMap.concat([...Object.values(patternMap)]).concat(mapSolution);

      //   console.log(map, "THISLEVEL!!!");
      // }

      if (isSandbox) {
        map = this.sandboxQuery.state.data.map
      }
      return map
  }

  public refetch = () => {
    return this.sandboxQuery.refetch()
  }

  private get sandboxQuery() {
    const sandboxId = this.router.params.sandboxId;
    return this.sandboxRepository.getSandboxById(sandboxId);
  }

  private get levelQuery() {
    const levelId = this.router.params.levelId;
    return this.levelRepository.getLevelById(levelId);
  }
}

export const createCanvas = () => new CanvasPres(routerService, sandboxRepository, levelRepository, solutionRepository);

