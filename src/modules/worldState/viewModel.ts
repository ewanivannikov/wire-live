import { makeAutoObservable, onBecomeUnobserved } from 'mobx';
import { type RouterService, routerService } from '../../shared/services';
import { createLevelContext } from './Level';
import { type SolutionRepository, solutionRepository } from '../../data/repositories/SolutionRepository/SolutionRepository';
import { Fields, fields } from '../Logic/Base';

export class WorldState {
  public isPaused = true;
  mode = 'level';
  modeContext = createLevelContext(this);
  public state = this.modeContext.state;

  constructor(
    private readonly _routerServ: RouterService,
    private readonly _solutionRepository: SolutionRepository,
    private readonly _fields: Fields
  ) {
    makeAutoObservable(this);
    onBecomeUnobserved(this,"_routerServ",()=>{
      this._solutionRepository.createDraft(
        this._fields.arrowCache,
        this._routerServ.params.levelId,
        '1',
      );
    })
  }

  public switchStatusOnLevelOneChecking() {
    this.modeContext.next();
    this.isPaused = false;
  }

  public switchStatusOnLevelSolving() {
    if (this.modeContext.state.status.includes('checking')) {
      this.modeContext.state.returnToSolving();
    }
  }

  public switchToCompleted = () => {
    if (this.modeContext.state.status.includes('bulk')) {
      this.modeContext.next();
      this._routerServ.navigate('/');
    }
  };

  public get status() {
    return this.state.status;
  }

  public get levelId() {
    return this._routerServ.params.levelId;
  }

  public togglePause() {
    if (this.isPaused) {
      this.modeContext.state.resume();
      this.isPaused = false;
    } else {
      this.modeContext.state.pause();
      this.isPaused = true;
    }
  }

  public canBeErased = (tile) => {
    return this.modeContext.state.canBeErased(tile);
  };

  public canBeDrawn = (tile) => {
    return this.modeContext.state.canBeDrawn(tile);
  };
}

export const worldState = new WorldState(routerService, solutionRepository, fields);
