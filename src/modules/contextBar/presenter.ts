import { makeAutoObservable } from 'mobx';
import { Tools } from '../mapContainer/Tools';
import { DirectionType, Tile, ToolType } from '../toolbar';

class Brush {
  private static instance: Brush | null = null;
  public currentBrush = 'Brush.0.Up';
  public currentBrushDirection = DirectionType.Up;
  public currentBrushDirectionList = [DirectionType.Up, DirectionType.Down, DirectionType.Left, DirectionType.Right];

  constructor(private readonly tools: Tools) {
    makeAutoObservable(this);
  }

  setCurrentBrush = (brush) => {
    this.currentBrush = brush;
    const direction = new Tile(brush).vector[2];
    this.currentBrushDirection = direction;
    // this.currentBrushDirectionList = 
  };

  setBrushDirection = (direction) => {
    this.currentBrushDirection = direction;
    const currentBrush = new Tile(this.currentBrush).vector;
    const brushId = `${currentBrush[0]}.${currentBrush[1]}.${direction}`;
    this.currentBrush = brushId;
  };

  get hasDirection() {
    return Boolean(this.currentBrushDirection);
  }

  get allowBrushes() {
    return this.tools.currentTool === ToolType.Brush;
  }

  public static getInstance(tools: Tools) {
    if (!Brush.instance) {
      Brush.instance = new Brush(tools);
    }

    return Brush.instance;
  }
}

export const createBrush = (tools: Tools) => Brush.getInstance(tools);
