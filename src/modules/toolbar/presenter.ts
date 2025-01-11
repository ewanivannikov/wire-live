import { makeAutoObservable } from 'mobx';
import { ToolType } from './enums';
import { Loop } from '../mapContainer/systems';
import { fields, Fields } from '../Logic/Base';
import { LevelRepository, levelRepository } from '../../data';
import { WorldState } from '../worldState';
import {
  routerService,
  RouterService,
} from '../../shared/services/RouterService';

class Tools {
  currentTool = ToolType.Brush;
  private _loop: Loop;

  constructor(
    private readonly levelRepo: LevelRepository,
    private readonly _router: RouterService,
    private readonly _worldState: WorldState,
    private readonly _fields: Fields,
  ) {
    makeAutoObservable(this);
    this._worldState.setCurrentTool(ToolType.Brush);
  }

  public setCurrentTool = (tool: ToolType) => {
    this.currentTool = tool;
    this._worldState.setCurrentTool(tool);
  };

  public setTick = () => {
    const isEditor = this._router.location.pathname.includes('editor');
    if (this._worldState.status === 'level.play.checking.one' || isEditor) {
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
    return this._worldState.status === 'level.play.solving';
  }
}

export const createToolbarPresenter = (worldState: WorldState) =>
  new Tools(levelRepository, routerService, worldState, fields);
