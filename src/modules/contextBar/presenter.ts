import { makeAutoObservable } from 'mobx';
import { Tools } from '../mapContainer/Tools';
import { DirectionType, Tile, ToolType } from '../toolbar';
import { brushes } from '../brushes';

class Brush {
  private static instance: Brush | null = null;
  public currentBrush = 'Brush.0.Up';
  public currentBrushDirection = DirectionType.Up;
  public currentBrushDirectionList = [
    DirectionType.Up,
    DirectionType.Down,
    DirectionType.Left,
    DirectionType.Right,
  ];

  public currentBrushFlip: '>' | '<' | '' = '';

  constructor(private readonly tools: Tools) {
    makeAutoObservable(this);
  }

  private getDirectionsByNumber(number: number) {
    const directions = Object.keys(brushes).reduce((acc, cur) => {
      const currentBrushNumber = new Tile(cur).vector[1];
      if (number === currentBrushNumber) {
        acc.push(new Tile(cur).vector[2]);
      }
      return acc;
    }, []);

    return [...new Set(directions)];
  }

  setCurrentBrush = (brush) => {
    this.currentBrush = brush;
    const direction = new Tile(brush).vector[2];
    this.currentBrushDirection = direction;
    const number = new Tile(brush).vector[1];
    this.currentBrushDirectionList = this.getDirectionsByNumber(number);
    const flip = new Tile(brush).vector[3];
    this.currentBrushFlip = flip;
  };

  setBrushDirection = (direction) => {
    this.currentBrushDirection = direction;
    const currentBrush = new Tile(this.currentBrush).vector;
    const brushId = `${currentBrush[0]}.${currentBrush[1]}.${direction}${currentBrush[3] ? `.${currentBrush[3]}` : ''}`;
    this.currentBrush = brushId;
  };

  setFlip = (isFlip: boolean) => {
    this.currentBrushFlip = isFlip ? '<' : '>';
    const currentBrush = new Tile(this.currentBrush).vector;
    const hasFlip = currentBrush[3];
    const brushId = `${currentBrush[0]}.${currentBrush[1]}.${currentBrush[2]}${hasFlip ? `.${this.currentBrushFlip}` : ''}`;
    this.currentBrush = brushId;
  };

  get hasDirection() {
    return Boolean(this.currentBrushDirection);
  }

  get hasFlip() {
    return Boolean(this.currentBrushFlip);
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
