import { makeAutoObservable } from 'mobx';
import { ToolType } from './enums';

class Tools {
  _currentTool = ToolType.Brush;
  constructor() {
    makeAutoObservable(this)
  }

  public setCurrentTool = (tool) => {
    this._currentTool = tool
  }

  get currentTool() {
    return this._currentTool
  }
}

export const tools = new Tools()
