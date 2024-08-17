import { makeAutoObservable } from 'mobx';
import { ToolType } from './enums';
import { Loop } from '../mapContainer/systems';

class Tools {
  currentTool = ToolType.Brush;
  tick = 500;
  private _loop: Loop;
  private _logicField;
  constructor() {
    makeAutoObservable(this);
  }

  public init = (loop, logicField) => {
    this._loop = loop;
    this._logicField = logicField;
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
