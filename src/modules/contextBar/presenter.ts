import { makeAutoObservable, runInAction, reaction } from 'mobx';
import { DirectionType, Tile, ToolType } from '../toolbar';
import type { LevelRepository, TileId } from '../../data';
import { brushRepository, levelRepository } from '../../data';
import { inputArrowModel, InputArrowModel } from './InputArrow/viewModel';
import { outputArrowModel, OutputArrowModel } from './OutputArrow';
import { type WorldState } from '../worldState';
import { routerService, RouterService } from '../../shared/services/RouterService';
import { intersection } from 'remeda';
import { onbordingLearning } from '../worldState/onbordingLearning';

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
    private readonly _levelRepository: LevelRepository,
    private readonly _worldState?: WorldState,
  ) {
    makeAutoObservable(this);
    
    reaction(
      () => this._worldState.modeContext.level,
      (level) => {
        const isLevels = this._router.location.pathname.includes('levels');
        if (isLevels && level) {
          const brush = level.allowedBrushList[0];

          if (brush && (!this.currentBrush || !level.allowedBrushList.includes(this.currentBrush))) {
            const [_, type, dir, fl] = new Tile(brush).vector;
            runInAction(() => {
              this.currentBrush = brush;
              this.currentBrushDirection = dir;
              this.currentBrushFlip = fl;
            });

            this.getDirectionsByNumber(type).then((directions) => {
              runInAction(() => {
                this.currentBrushDirectionList = directions;
              });
            });
          }
        }
      },
      { fireImmediately: true }
    );
  }



  private get brushList() {
    return brushRepository.getBrushList()
  }

  private getDirectionsByNumber = async (number: number): Promise<DirectionType[]> => {
    const data = await this.brushList.refetch()
      const directions = Object.keys(data).reduce(
        (acc: DirectionType[], cur) => {
          const currentBrushNumber = new Tile(cur).vector[1];
          if (number === currentBrushNumber) {
            acc.push(new Tile(cur).vector[2]);
          }
          return acc;
        },
        [],
      );
      return [...new Set(directions)]
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

  public setCurrentBrush = (brush: TileId) => {
    runInAction(() => {
      this.currentBrush = brush;
      const direction = new Tile(brush).vector[2];
      this.currentBrushDirection = direction;
      const flip = new Tile(brush).vector[3];
      this.currentBrushFlip = flip;
      this._worldState.setCurrentBrush(brush);
      this._worldState.setCurrentBrushOptions(this.currentBrushOptions);
    });

    const number = new Tile(brush).vector[1];
    this.getDirectionsByNumber(number).then((directions) => {
      runInAction(() => {
        if(directions.length > 0) {
          this.currentBrushDirectionList = directions;
        }
      });
    });
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
    const isEditor = this._router.location.pathname.includes('editor');

    let brushesData = null;
    if (isLevels) {
      brushesData = this.getClastersBrushesByLevelId(this._worldState.levelId);
    } else if (isSandbox || isEditor) {
      brushesData = this.getClastersBrushesForSandbox();
    }

    if (!brushesData) {
      return [];
    }

    const clastersBrushes = Object.entries(brushesData);

    if (
      !this.currentBrush &&
      clastersBrushes.length > 0 &&
      clastersBrushes[0][1] &&
      clastersBrushes[0][1].values.length > 0
    ) {
      const firstBrush = clastersBrushes[0][1].values[0];
      this.setCurrentBrush(firstBrush);
    }
    return clastersBrushes;
  }

  public runLearning = () => {
    onbordingLearning.drive();
  };

  public get statusClastersBrushList() {
    return this.clastersBrushListQuery.status;
  }

  public get groupsBrushes() {
    return this.groupsBrushesQuery.data;
  }

  private getClastersBrushesByLevelId = (levelId: string) => {
    const level = this._levelRepository.getLevelById2(levelId);
    level.execute();
    if (level.data) {
      return this.getClastersBrushesByIds(level.data.allowedBrushList);
    }
    return null;
  };

  private getClastersBrushesForSandbox = () => {
    return this.clastersBrushListQuery.data
  }

  private getClastersBrushesByIds = (ids: string[] = []) => {
    if (ids.length === 0) return this.clastersBrushListQuery.data;
    let whiteList = {};
    const filteredClasters = Object.entries(this.clastersBrushListQuery.data);
    
    filteredClasters.forEach(([key, value]) => {
      const keyWhiteList = intersection(ids, value.values);
      if (keyWhiteList.length > 0) {
        whiteList = { ...whiteList, [key]: { ...value, values: keyWhiteList } };
      }
    });

    return whiteList;
  };

  private get clastersBrushListQuery() {
    const clastersBrusheList = brushRepository.getClastersBrusheList();
    clastersBrusheList.execute();
    return clastersBrusheList;
  }

  private get groupsBrushesQuery() {
    const clastersBrusheList = brushRepository.getGroupsBrushes();
    clastersBrusheList.execute();
    return clastersBrusheList;
  }
}

export const createBrush = (worldState: WorldState) => new Brush(
  inputArrowModel,
  outputArrowModel,
  routerService,
  levelRepository,
  worldState,
);
