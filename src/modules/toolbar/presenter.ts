import { makeAutoObservable, runInAction } from 'mobx';
import { ToolType } from './enums';
import { Loop } from '../mapContainer/systems';
import { fields, Fields, solutionPercentage } from '../Logic/Base';
import { LevelRepository, levelRepository } from '../../data';
import { WorldState } from '../worldState';
import {
  routerService,
  RouterService,
} from '../../shared/services/RouterService';
import { emitter } from '../../shared/services/EventEmitterService';

class Tools {
  currentTool = ToolType.Brush;
  private _loop: Loop;
  private progress = 0

  constructor(
    private readonly levelRepo: LevelRepository,
    private readonly _router: RouterService,
    private readonly _worldState: WorldState,
    private readonly _fields: Fields,
  ) {
    makeAutoObservable(this);
    this._worldState.setCurrentTool(ToolType.Brush);
    const isLevels = this._router.matchPath('/levels/:levelId', this._router.location.pathname);
    
    if (isLevels) {
      emitter.on(solutionPercentage, data => {
        runInAction(() => {
          this.progress = data * 100
          //console.log(this.progress)
        })
      });
    }
  }

  public get showProgress() {
    const isLevels = this._router.location.pathname.includes('levels');
    return isLevels
  }

  public setCurrentTool = (tool: ToolType) => {
    this.currentTool = tool;
    this._worldState.setCurrentTool(tool);
  };

  public setTick = () => {
    const isEditor = this._router.matchPath('/editor', this._router.location.pathname);
    const isSandbox = this._router.matchPath('/sandboxes/:sandboxId', this._router.location.pathname);
    if (this._worldState.status === 'level.play.checking.one' || isEditor || isSandbox) {
      this._worldState.togglePause(this._loop);
    }
  };

  public switchOnOneChecking = () => {
    this._worldState.switchStatusOnLevelOneChecking();
  };

  public switchOnSolving = () => {
    this._worldState.switchStatusOnLevelSolving();
  };

  public saveMap = () => {
    const map = this._fields.arrowCache;
    this.levelRepo.createMap(map);
  };

  public get showSave() {
    const isEditor = this._router.location.pathname.includes('editor');
    return isEditor;
  }

  public get disabledPlay() {
    const isLevels = this._router.location.pathname.includes('levels');
    return isLevels && this._worldState.status === 'level.play.solving';
  }

  public get disabledBrush() {
    const isLevels = this._router.location.pathname.includes('levels');
    return isLevels && this._worldState.status !== 'level.play.solving';
  }

  public get disabledEraser() {
    const isLevels = this._router.location.pathname.includes('levels');
    return isLevels && this._worldState.status !== 'level.play.solving';
  }

  public get showLevelStateToggler() {
    const isLevels = this._router.location.pathname.includes('levels');
    return isLevels;
  }

  public get isPaused() {
    return this._worldState.isPaused;
  }

  public get pressedSubmit() {
    return this._worldState.status === 'level.play.checking.one';
  }

  public get pressedWrite() {
    this.progress = 0
    return this._worldState.status === 'level.play.solving';
  }

  public get indicatorOutput() {
    return this.progress
  }
}

export const createToolbarPresenter = (worldState: WorldState) =>
  new Tools(levelRepository, routerService, worldState, fields);
