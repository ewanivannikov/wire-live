import { makeAutoObservable } from 'mobx';
import { ToolType } from './enums';
import { Loop } from '../mapContainer/systems';
import { Fields } from '../Logic/Base';
import { LevelRepository, levelRepository } from '../../data';
import { WorldState, worldState } from '../worldState';
import { routerService, RouterService } from '../../shared/services/RouterService';

class Tools {
  currentTool = ToolType.Brush;
  private _loop: Loop;
  private _logicField: Fields;
  private _tileMap;
  constructor(
    private readonly levelRepo: LevelRepository,
    private readonly worldState: WorldState,
    private readonly _router: RouterService,
  ) {
    makeAutoObservable(this);
  }

  private erase = (tile) => {
    this._tileMap.removeTile(tile);
    this._logicField.stateCache.delete(tile.name);
  };

  public init = (loop: Loop, logicField: Fields, tileMap) => {
    this._loop = loop;
    this._logicField = logicField;
    this._tileMap = tileMap;
    tileMap.onPointerChange = (tile) => {
      const canBeErased = this.worldState.canBeErased(tile);
      const canBeDrawn = this.worldState.canBeDrawn(tile);
      const isEraser = this.currentTool === ToolType.Eraser;
      const isBrush = this.currentTool === ToolType.Brush;
      const isPan = this.currentTool === ToolType.Pan;

      if (canBeErased && isEraser) {
        // НАЙДИ БАГ СВЯЗАННЫЙ С ПАУЗОЙ, РИСОВАНИЕМ И СТИРАНИЕМ. ГДЕ-ТО В onPointerMove!
        this.erase(tile);
      }
      if (canBeDrawn && isBrush) {
        this._tileMap.updateTile(tile);
      }
      if (isPan) {
        if (
          tile.userData.type?.includes('20') ||
          tile.userData.type?.includes('23')
        ) {
          this._logicField.addSignal(tile.name, 1);
        }
      }
    };
  };

  public setCurrentTool = (tool) => {
    this.currentTool = tool;
  };

  public setTick = () => {
    const isEditor = this._router.location.pathname.includes('editor');
    if (this.worldState.status === 'level.play.checking.one' || isEditor) {
      this.worldState.togglePause(this._loop);
    }
  };

  public switchOnOneChecking = () => {
    this.worldState.switchStatusOnLevelOneChecking();
  };

  public switchOnSolving = () => {
    this.worldState.switchStatusOnLevelSolving();
  };

  public saveMap = () => {
    const map = this._logicField.arrowCache;
    this.levelRepo.createMap(map);
  };

  public get showSave() {
    const isEditor = this._router.location.pathname.includes('editor');
    return isEditor;
  }

  public get disabledPlay() {
    const isLevels = this._router.location.pathname.includes('levels');
    return isLevels && this.worldState.status === 'level.play.solving';
  }

  public get disabledBrush() {
    const isLevels = this._router.location.pathname.includes('levels');
    return isLevels && this.worldState.status !== 'level.play.solving';
  }

  public get disabledEraser() {
    const isLevels = this._router.location.pathname.includes('levels');
    return isLevels && this.worldState.status !== 'level.play.solving';
  }

  public get showLevelStateToggler() {
    const isLevels = this._router.location.pathname.includes('levels');
    return isLevels;
  }
}

export const tools = new Tools(levelRepository, worldState, routerService);
