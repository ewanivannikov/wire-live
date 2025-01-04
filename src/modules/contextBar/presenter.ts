import { makeAutoObservable } from 'mobx';
import { Tools } from '../mapContainer/Tools';
import { DirectionType, Tile, tools, ToolType } from '../toolbar';
import type { Direction, TileId } from '../../data';
import { brushRepository } from '../../data';
import { inputArrowModel, InputArrowModel } from './InputArrow/viewModel';
import { outputArrowModel, OutputArrowModel } from './OutputArrow';
import { type WorldState } from '../worldState';
import { routerService, RouterService } from '../../shared/services/RouterService';
import { worldState } from '../../main';

class Brush {
  public currentBrush = '';
  public currentBrushDirection = DirectionType.Up;
  public currentBrushDirectionList = [
    DirectionType.Up,
    DirectionType.Left,
    DirectionType.Down,
    DirectionType.Right,
  ];

  public currentBrushFlip: '>' | '<' | '' = '';

  constructor(
    private readonly inputArrowModel: InputArrowModel,
    private readonly outputArrowModel: OutputArrowModel,
    private readonly _router: RouterService,
    private readonly _worldState?: WorldState
  ) {
    makeAutoObservable(this);
    // this.init();
  }

  private init() {
    const isLevels = this._router.location.pathname.includes('levels');
    if (isLevels) {
      const brush = this._worldState.modeContext.level.allowedBrushList[0];

      if(brush){
        const [_, type, dir, fl] = new Tile(brush).vector;
        this.currentBrush = brush;
        this.currentBrushDirection = dir;
        this.currentBrushFlip = fl;
        
        this.currentBrushDirectionList = this.getDirectionsByNumber(
          type,
        );
      }
    }
  }

  private getDirectionsByNumber(number: number) {
    const directions = Object.keys(brushRepository.brushList).reduce(
      (acc, cur) => {
        const currentBrushNumber = new Tile(cur).vector[1];
        if (number === currentBrushNumber) {
          acc.push(new Tile(cur).vector[2]);
        }
        return acc;
      },
      [],
    );

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
    this._worldState.setCurrentBrush(brush);
    this._worldState.setCurrentBrushOptions(this.currentBrushOptions);
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

  public nextDirection = () => {
    const newDirection =
      this.currentBrushDirectionList[
        (this.currentBrushDirectionList.indexOf(this.currentBrushDirection) +
          1) %
          4
      ];
    this.setBrushDirection(newDirection);
  };

  public prevDirection = () => {
    const newDirection =
      this.currentBrushDirectionList[
        (this.currentBrushDirectionList.indexOf(this.currentBrushDirection) +
          3) %
          4
      ];
    this.setBrushDirection(newDirection);
  };

  public initHotKeys = () => {
    const keysPressed = {};

    addEventListener('keydown', (event) => {
      keysPressed[event.code] = true;

      if (!keysPressed.ShiftLeft && event.code == 'KeyR') {
        this.nextDirection();
      }
      if (keysPressed.ShiftLeft && event.code == 'KeyR') {
        this.prevDirection();
      }
    });

    addEventListener('keyup', (event) => {
      delete keysPressed[event.code];
    });
  };

  get allowBrushes() {
    return this._worldState.currentTool === ToolType.Brush;
  }

  get allowPanel() {
    return this._worldState.status === 'level.play.solving' || this._worldState.status === 'editor';
  }

  get currentTool() {
    return this._worldState.currentTool;
  }

  public get clastersBrushList() {
    return Object.entries(
      brushRepository.getClastersBrushesByLevelId(this._worldState.levelId),
    );
  }
}

export const createBrush = (worldState: WorldState) => new Brush(
  inputArrowModel,
  outputArrowModel,
  routerService,
  worldState
);
