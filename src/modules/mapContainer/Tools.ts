class Tools {
  private _currentTool = 'Eraser';

  get currentTool() {
    return this._currentTool;
  }

  setCurrentTool = (tool) => {
    this._currentTool = tool;
  };
}

export const createTools = () => new Tools();
