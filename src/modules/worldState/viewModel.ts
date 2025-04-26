import { makeAutoObservable, onBecomeUnobserved, runInAction } from 'mobx';
import { type RouterService, routerService } from '../../shared/services';
import { createLevelContext } from './Level';
import { type SolutionRepository, solutionRepository } from '../../data/repositories/SolutionRepository/SolutionRepository';
import { Fields, fields } from '../Logic/Base';
import { createEditorContext } from './EditorContext/EditorContext';
import { ToolType } from '../toolbar/enums';
import { TileId } from '../../data/repositories/BrushRepository';
import { TileMap } from '../mapContainer/TileMap';
import { type Sprite } from 'three';
import { levelRepository, LevelRepository } from '../../data/repositories/LevelRepository';
import { onbordingLearning } from './onbordingLearning';
import { createSandboxContext } from './SandboxContext/SandboxContext';

export class WorldState {
  public isPaused = true;
  mode = 'level';
  public modeContext = this.context;
  public state = this.context.state;
  public currentTool: ToolType = ToolType.Brush;
  public currentBrush: TileId | '' = '';
  public currentBrushOptions
  public challenges = [{ barColor: 'green', amount: 100, status: 'resolved' }];
  public statusCompleted = 'idle';
  public amountArrows = NaN

  constructor(
    private readonly _routerServ: RouterService,
    private readonly _solutionRepository: SolutionRepository,
    private readonly _levelRepo: LevelRepository,
    private readonly _fields: Fields,
  ) {
    makeAutoObservable(this);

    this.initСhallenges();
    
    document.addEventListener('DOMContentLoaded', (e) => {
      if (this._routerServ.location.pathname === '/levels/Briefing') {
        onbordingLearning.drive();
      }
    });

    this._routerServ.onNavigate((e)=>{
      if (e.target.location.hash.slice(1) === '/levels/Briefing') {
        onbordingLearning.drive();
      }
    })
  }

  private erase = (tile, tileMap) => {
    tileMap.removeTile(tile);
    this._fields.stateCache.delete(tile.name);
  };

  public init = (tileMap: TileMap) => {
    tileMap.onPointerChange = (tile) => {
      const canBeErased = this.canBeErased(tile);
      const canBeDrawn = this.canBeDrawn(tile);
      const isEraser = this.currentTool === ToolType.Eraser;
      const isBrush = this.currentTool === ToolType.Brush;
      const isPan = this.currentTool === ToolType.Pan;

      if (canBeErased && isEraser) {
        this.erase(tile, tileMap);
      }
      if (canBeDrawn && isBrush) {
        tileMap.updateTile(
          tile,
          this.currentBrush,
        );
      }
      if (isPan) {
        if (
          tile.userData.type?.includes('20') ||
          tile.userData.type?.includes('23')
        ) {
          this._fields.addSignal(tile.name, 1);
        }
      }
    };
  };

  public initСhallenges = () => {
    const level = this._levelRepo.getLevelById(this._routerServ.params.levelId);
    const lenReq = Object.keys(
      level?.requisites ?? {},
    ).length;
    for (let i = 1; i < lenReq; i++) {
      this.challenges.push({ amount: 100, status: i === 0 ? 'resolved' : 'idle' });
    }
  }

  public resetСhallenges = () => {
    const level = this._levelRepo.getLevelById(this._routerServ.params.levelId);
    const lenReq = Object.keys(
      level?.requisites ?? {},
    ).length;
    for (let i = 1; i < lenReq; i++) {
      this.challenges[i] = { amount: 100, status: i === 0 ? 'resolved' : 'idle' };
    }
  }

  public switchStatusOnLevelOneChecking = () => {
    this.modeContext.next();
    this.isPaused = false;
  }

  public switchStatusOnLevelSolving() {
    if (this.modeContext.state.status.includes('checking')) {
      console.log(console.log('Пользователь вызвал: Возвращение в состояние Solving'));
      
      this.modeContext.state.returnToSolving();
    }
  }

  public switchToCompleted = () => {
    if (this.modeContext.state.status.includes('bulk')) {
      this.modeContext.next();
      this._routerServ.navigate('/');
    }
  };

  public get status() {
    return this.state.status;
  }

  public get levelId() {
    return this._routerServ.params.levelId;
  }

  public setChallenge = ({challenge, index}) => {
    const level = this._levelRepo.getLevelById(this._routerServ.params.levelId);
    const lenReq = Object.keys(
      level?.requisites ?? {},
    ).length;
    runInAction(()=> {
      if(index < lenReq - 1) {
        this.challenges[index+1] = {...this.challenges[index+1], status: 'pending'}
      }
      this.challenges[index] = challenge;
    })
  }

  public setStatusCompleted = (status) => {
    this.statusCompleted = status
  }

  public setState = (state) => {
    this.state = state;
  }

  public get showAverageSteps() {
    return;
  }

  public togglePause() {
    if (this.isPaused) {
      this.modeContext.state.resume();
      this.isPaused = false;
    } else {
      this.modeContext.state.pause();
      this.isPaused = true;
    }
  }

  public canBeErased = (tile) => {
    return this.modeContext.state.canBeErased(tile);
  };

  public canBeDrawn = (tile) => {
    return this.modeContext.state.canBeDrawn(tile);
  };

  public onIntersectCanvas = (
    gridIntersect: Sprite,
    event: PointerEvent,
    texture,
  ) => {
    const canBeDrawn = this.canBeDrawn(gridIntersect);
    const canBeErased = this.canBeErased(gridIntersect);
    const tool =
      this.currentTool === ToolType.Brush
        ? this.currentBrush
        : ToolType.Eraser;

    if (event.pressure === 0 && (canBeDrawn || canBeErased)) {
      if (tool === ToolType.Eraser) {
        gridIntersect.material.color.set(`#ff0000`);
      }

      gridIntersect.material.map = texture[tool];
      gridIntersect.material.opacity = 0.4;
      gridIntersect.material.needsUpdate = true;
    }
  };

  public setCurrentTool = (currentTool: ToolType) => {
    runInAction(()=> {
      this.currentTool = currentTool;
    })
  }

  public setCurrentBrush = (currentBrush: TileId) => {
    this.currentBrush = currentBrush;
  }

  public setCurrentBrushOptions = (currentBrushOptions) => {
    this.currentBrushOptions = currentBrushOptions;
  }

  private get context() {
    if (this.isLevels) {
      return createLevelContext(this);
    }
    if (this.isSandbox) {
      return createSandboxContext(this);
    }
    if (this.isEditor) {
      return createEditorContext(this);
    } 
  }

  private get isLevels() {
    const isLevels = this._routerServ.matchPath('/levels/:levelId', this._routerServ.location.pathname);
    return isLevels
  }
  private get isSandbox() {
    const isSandbox = this._routerServ.matchPath('/sandboxes/:sandboxId', this._routerServ.location.pathname);
    return isSandbox
  }
  private get isEditor() {
    const isEditor = this._routerServ.matchPath('/editor', this._routerServ.location.pathname);
    return isEditor
  }

  public dispose = () => {
      
    if (this.isLevels) {
      const levelId = this._routerServ.params.levelId
      this._solutionRepository.createDraft(
        this._fields.arrowCache,
        levelId,
      );
    }
      
    this._fields.clearAll();
    if(this.modeContext.state?.pause){
      this.modeContext.state.pause();
      runInAction(()=>{
        this.isPaused = true;
      })
    }
  }
}

export const createWorldState = () => new WorldState(routerService, solutionRepository, levelRepository, fields);
