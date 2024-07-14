import { makeAutoObservable } from 'mobx';
import { Tools } from '../mapContainer/Tools';


class Brush {
  private static instance: Brush | null = null;
  public currentBrush = '1.up';
  public currentBrushDirection = 'up';

  constructor(private readonly tools: Tools) {
    makeAutoObservable(this)
  }

  setCurrentBrush = (brush) => {
    this.currentBrush = brush
  }

  setBrushDirection = (direction) => {
    this.currentBrushDirection = direction
    const brushId = `${this.currentBrush.split('.')[0]}.${direction}`;
    this.currentBrush = brushId
  }

  get hasDirection() {
    return Boolean(this.currentBrushDirection)
  }

  get allowBrushes() {
    return this.tools.currentTool === 'brush'
  }

  public static getInstance(tools: Tools) {
    if (!Brush.instance) {
      Brush.instance = new Brush(tools);
    }

    return Brush.instance;
  }
}

export const createBrush = (tools: Tools) => Brush.getInstance(tools);
