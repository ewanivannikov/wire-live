import { makeAutoObservable, runInAction } from 'mobx';
import { DirectionType, Tile, ToolType } from '../toolbar';
import type { TileId } from '../../data';
import { brushRepository } from '../../data';
import { inputArrowModel, InputArrowModel } from './InputArrow/viewModel';
import { outputArrowModel, OutputArrowModel } from './OutputArrow';
import { type WorldState } from '../worldState';
import { routerService, RouterService } from '../../shared/services/RouterService';
import { add } from 'remeda';
import { onbordingLearning } from '../worldState/onbordingLearning';
import { log } from 'console';

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
    this.init();
  }

  private init() {
    const isLevels = this._router.location.pathname.includes('levels');
    if (isLevels) {
      const brush = this._worldState.modeContext.level.allowedBrushList[0];

      if (brush) {
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

  private get brushList() {
    return brushRepository.getBrushList()
  }

  private getDirectionsByNumber = async (number: number) => {
    return new Promise((res)=>{
      this.brushList.refetch().then((data)=>{
        const directions = Object.keys(data).reduce(
          (acc, cur) => {
            const currentBrushNumber = new Tile(cur).vector[1];
            if (number === currentBrushNumber) {
              acc.push(new Tile(cur).vector[2]);
            }
            return acc;
          },
          [],
        );
        res([...new Set(directions)])
      })
    });
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
    runInAction(async ()=>{
      this.currentBrush = brush;
      const direction = new Tile(brush).vector[2];
      this.currentBrushDirection = direction;
      const number = new Tile(brush).vector[1];
      this.currentBrushDirectionList = await this.getDirectionsByNumber(number);
      const flip = new Tile(brush).vector[3];
      this.currentBrushFlip = flip;
      this._worldState.setCurrentBrush(brush);
      this._worldState.setCurrentBrushOptions(this.currentBrushOptions);
    })
  };

  setBrushDirection = (direction: DirectionType) => {
    this.currentBrushDirection = direction;
    const currentBrush = new Tile(this.currentBrush).vector;
    const brushId = `${currentBrush[0]}.${currentBrush[1]}.${direction}${currentBrush[3] ? `.${currentBrush[3]}` : ''}`;
    this.currentBrush = brushId;
    this._worldState.setCurrentBrush(brushId);
    if(currentBrush[1] === 21 || currentBrush[1] === 22){
      this._worldState.setCurrentBrushOptions(this.currentBrushOptions);
    }
  };

  setFlip = (isFlip: boolean) => {
    this.currentBrushFlip = isFlip ? '<' : '>';
    const currentBrush = new Tile(this.currentBrush).vector;
    const hasFlip = currentBrush[3];
    const brushId = `${currentBrush[0]}.${currentBrush[1]}.${currentBrush[2]}${hasFlip ? `.${this.currentBrushFlip}` : ''}`;
    this.currentBrush = brushId;
    this._worldState.setCurrentBrush(brushId);
    if(currentBrush[1] === 21 || currentBrush[1] === 22){
      this._worldState.setCurrentBrushOptions(this.currentBrushOptions);
    }
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
    const keysPressed: Record<string, boolean> = {};

    addEventListener('keydown', (event: KeyboardEvent) => {
      keysPressed[event.code] = true;

      if (!keysPressed.ShiftLeft && event.code == 'KeyR') {
        this.nextDirection();
      }
      if (keysPressed.ShiftLeft && event.code == 'KeyR') {
        this.prevDirection();
      }
    });

    addEventListener('keyup', (event: KeyboardEvent) => {
      delete keysPressed[event.code];
    });
  };

  get allowBrushes() {
    console.log(this._worldState.currentTool === ToolType.Brush);
    
    return this._worldState.currentTool === ToolType.Brush;
  }

  get allowPanel() {
    return this._worldState.status === 'level.play.solving' || 
    this._worldState.status === 'editor' || 
    this._worldState.status === 'sandbox';
  }

  get currentTool() {
    return this._worldState.currentTool;
  }

  public get clastersBrushList() {
    const isLevels = this._router.location.pathname.includes('levels');
    const isSandbox = this._router.location.pathname.includes('sandbox');
    console.log("ЧТо это?", isLevels, isSandbox);
    
    if(isLevels) {
      const clastersBrushes = Object.entries(
        brushRepository.getClastersBrushesByLevelId(this._worldState.levelId),
      );
      const firstBrush = clastersBrushes[0][1].values[0];
      this.setCurrentBrush(firstBrush);
      return clastersBrushes
    }
    if(isSandbox) {
      const clastersBrushes = Object.entries(
        brushRepository.getClastersBrushesForSandbox(),
      );
      const firstBrush = clastersBrushes[0][1].values[0];
      this.setCurrentBrush(firstBrush);
      return clastersBrushes
    }
    const clastersBrushes = Object.entries(brushRepository.clastersBrushes);
    this.setCurrentBrush(clastersBrushes[0][1].values[0]);
    return clastersBrushes;
  }

  public runLearning = () => {
    onbordingLearning.drive();
  }
}

export const createBrush = (worldState: WorldState) => new Brush(
  inputArrowModel,
  outputArrowModel,
  routerService,
  worldState
);
