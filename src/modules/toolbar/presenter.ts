import { makeAutoObservable } from 'mobx';
import { ToolType } from './enums';
import { Loop } from '../mapContainer/systems';
import { Fields } from '../Logic/Base';
import { LevelRepository, levelRepository } from '../../data';
import { WorldState, worldState } from '../worldState';

class Tools {
  currentTool = ToolType.Brush;
  private _loop: Loop;
  private _logicField: Fields;
  private _tileMap;
  constructor(private readonly levelRepo: LevelRepository, private readonly worldState: WorldState) {
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
      const canBeDeleted = this.worldState.canBeDeleted(tile)
      const isEraser = this.currentTool === ToolType.Eraser
      const isSolving = (`level.play.solving` === this.worldState.status) && this._logicField.paused

      if (canBeDeleted && isEraser && isSolving) {
        //НАЙДИ БАГ СВЯЗАННЫЙ С ПАУЗОЙ, РИСОВАНИЕМ И СТИРАНИЕМ. ГДЕ-ТО В onPointerMove!
        this.erase(tile);
      }
      if (this.currentTool === ToolType.Brush) {
        this._tileMap.updateTile(tile);
      }
      if (this.currentTool === ToolType.Pan) {
        if (tile.userData.type?.includes('20') || tile.userData.type?.includes('23')) {
          this._logicField.addSignal(tile.name, 1);
        }
      }
    }
  };

  public setCurrentTool = (tool) => {
    this.currentTool = tool;
  };

  public setTick = () => {
    if ((this.worldState.status === 'level.play.checking.one')) {
      this.worldState.togglePause(this._loop);
    }
  };

  public switchOnOneChecking = () => {
    this.worldState.switchOnSend();
  }

  public switchOnSolving = () => {
    this.worldState.switchOnSolve();
  }

  public saveMap = () => {
    const map = this._logicField.arrowCache
    this.levelRepo.createMap(map)
  }
}

export const tools = new Tools(levelRepository, worldState);
