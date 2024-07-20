import { makeAutoObservable } from 'mobx';
import { ToolType } from './enums';
import { Loop } from '../mapContainer/systems';

class Tools {
  currentTool = ToolType.Brush;
  tick = 500
  private _loop: Loop;
  constructor() {
    makeAutoObservable(this);
  }

  public init = (loop) => {
    this._loop = loop
  };

  public setCurrentTool = (tool) => {
    this.currentTool = tool;
  };

  public setTick = () => {
    if (this.tick > 0) {
      this.tick = 0
      this._loop.setDuration(0)
    } else {
      this.tick = 500
      this._loop.setDuration(500)
    }
  }

}

export const tools = new Tools();
