import { makeAutoObservable } from 'mobx';
import { ToolType } from './enums';
import { Loop } from '../mapContainer/systems';
import { Fields } from '../Logic/Base';

class Tools {
  currentTool = ToolType.Brush;
  tick = 500;
  private _loop: Loop;
  private _logicField: Fields;
  private _tileMap;
  constructor() {
    makeAutoObservable(this);
  }

  public init = (loop: Loop, logicField: Fields, tileMap) => {
    this._loop = loop;
    this._logicField = logicField;
    this._tileMap = tileMap;
    tileMap.onPointerChange = (tile) => {
      if (this.currentTool === ToolType.Eraser) {
        this._tileMap.removeTile(tile);
        this._logicField.stateCache.delete(tile.name);
      }
      if (this.currentTool === ToolType.Brush) {
        this._tileMap.updateTile(tile);
      }
      if (this.currentTool === ToolType.Pan) {
        if (tile.userData.type?.includes('20')) {
          this._logicField.addSignal(tile.name, 1);
        }
      }
    }
  };

  public setCurrentTool = (tool) => {
    this.currentTool = tool;
  };

  public setTick = () => {
    if (this.tick > 0) {
      this.tick = 0;
      this._logicField.updatePause();
    } else {
      this.tick = 500;
      this._loop.setDuration(500);
      this._logicField.updatePause();
    }
  };
}

export const tools = new Tools();