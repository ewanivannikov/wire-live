import { makeAutoObservable } from 'mobx';

class Tools {
  _currentTool = 'eraser';
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
