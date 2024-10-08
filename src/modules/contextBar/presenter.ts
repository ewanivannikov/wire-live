import { makeAutoObservable } from 'mobx';
import { Tools } from '../mapContainer/Tools';
import { DirectionType, Tile, ToolType } from '../toolbar';
import type { Direction, TileId } from '../../data';
import { brushRepository } from '../../data';
import { inputArrowModel, InputArrowModel } from './InputArrow/viewModel';
import { outputArrowModel, OutputArrowModel } from './OutputArrow';
import { WorldState } from '../worldState';

class Brush {
  private static instance: Brush | null = null;
  public currentBrush = '';
  public currentBrushDirection = DirectionType.Up;
  public currentBrushDirectionList = [
    DirectionType.Up,
    DirectionType.Down,
    DirectionType.Left,
    DirectionType.Right,
  ];

  public currentBrushFlip: '>' | '<' | '' = '';

  constructor(
    private readonly tools: Tools,
    private readonly inputArrowModel: InputArrowModel,
    private readonly outputArrowModel: OutputArrowModel,
    private readonly worldState: WorldState
  ) {
    makeAutoObservable(this);
    this.init();
  }

  private init() {
    if ((this.worldState.status.includes('level'))){
      const brush = this.worldState.level.allowedBrushList[0]
      const [_, _a, dir, fl]= new Tile(brush).vector
      this.currentBrush = brush
      this.currentBrushDirection = dir
      this.currentBrushFlip = fl

      this.currentBrushDirectionList = this.getDirectionsByNumber(new Tile(brush).vector[1])
    }
  }

  private getDirectionsByNumber(number: number) {
    const directions = Object.keys(brushRepository.brushList).reduce((acc, cur) => {
      const currentBrushNumber = new Tile(cur).vector[1];
      if (number === currentBrushNumber) {
        acc.push(new Tile(cur).vector[2]);
      }
      return acc;
    }, []);

    return [...new Set(directions)];
  }

  public get currentBrushOptions() {
    const number = new Tile(this.currentBrush).vector[1];
    if (number === 21) {
      return this.inputArrowModel.fields;
    }
    if (number === 22) {
      return this.outputArrowModel.fields;
    }
    return null;
  }

  setCurrentBrush = (brush: TileId) => {
    this.currentBrush = brush;
    const direction = new Tile(brush).vector[2];
    this.currentBrushDirection = direction;
    const number = new Tile(brush).vector[1];
    this.currentBrushDirectionList = this.getDirectionsByNumber(number);
    const flip = new Tile(brush).vector[3];
    this.currentBrushFlip = flip;
  };

  setBrushDirection = (direction: Direction) => {
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

  public static getInstance(
    tools: Tools,
    inputArrowModel: InputArrowModel,
    outputArrowModel: OutputArrowModel,
    worldState: WorldState
  ) {
    if (!Brush.instance) {
      Brush.instance = new Brush(tools, inputArrowModel, outputArrowModel, worldState);
    }

    return Brush.instance;
  }

  public get clastersBrushList() {
    return Object.entries(brushRepository.getClastersBrushesByLevelId(this.worldState.levelId));
  }
}

export const createBrush = (tools: Tools, worldState: WorldState) =>
  Brush.getInstance(tools, inputArrowModel, outputArrowModel, worldState);
