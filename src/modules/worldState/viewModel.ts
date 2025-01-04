import { makeAutoObservable, onBecomeUnobserved } from 'mobx';
import { type RouterService, routerService } from '../../shared/services';
import { createLevelContext } from './Level';
import { type SolutionRepository, solutionRepository } from '../../data/repositories/SolutionRepository/SolutionRepository';
import { Fields, fields } from '../Logic/Base';
import { createEditorContext } from './EditorContext/EditorContext';
import { Loop } from '../mapContainer/systems';
import { ToolType } from '../toolbar/enums';

export class WorldState {
  public isPaused = true;
  mode = 'level';
  modeContext = this.context;
  public state = this.context.state;
  public currentTool
  public currentBrush
  public currentBrushOptions

  constructor(
    private readonly _routerServ: RouterService,
    private readonly _solutionRepository: SolutionRepository,
    private readonly _fields: Fields
  ) {
    makeAutoObservable(this);
    onBecomeUnobserved(this,"_routerServ",()=>{
      this._solutionRepository.createDraft(
        this._fields.arrowCache,
        this._routerServ.params.levelId,
        '1',
      );
    })
  }

  private erase = (tile, tileMap) => {
    tileMap.removeTile(tile);
    this._fields.stateCache.delete(tile.name);
  };

  public init = (loop: Loop, tileMap) => {
    this._loop = loop;
    this._logicField = this._fields;
    this._tileMap = tileMap;
    tileMap.onPointerChange = (tile) => {
      const canBeErased = this.canBeErased(tile);
      const canBeDrawn = this.canBeDrawn(tile);
      const isEraser = this.currentTool === ToolType.Eraser;
      const isBrush = this.currentTool === ToolType.Brush;
      const isPan = this.currentTool === ToolType.Pan;

      if (canBeErased && isEraser) {
        // НАЙДИ БАГ СВЯЗАННЫЙ С ПАУЗОЙ, РИСОВАНИЕМ И СТИРАНИЕМ. ГДЕ-ТО В onPointerMove!
        this.erase(tile, tileMap);
      }
      if (canBeDrawn && isBrush) {
        this._tileMap.updateTile(
          tile,
          this.currentTool === 'Eraser'
            ? 'Eraser'
            : this.currentBrush,
        );
      }
      if (isPan) {
        if (
          tile.userData.type?.includes('20') ||
          tile.userData.type?.includes('23')
        ) {
          this._logicField.addSignal(tile.name, 1);
        }
      }
    };
  };

  public switchStatusOnLevelOneChecking() {
    this.modeContext.next();
    this.isPaused = false;
  }

  public switchStatusOnLevelSolving() {
    if (this.modeContext.state.status.includes('checking')) {
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

  public onIntersectCanvas = (gridIntersect, event, texture) => {
    const canBeDrawn = this.canBeDrawn(gridIntersect);
    const canBeErased = this.canBeErased(gridIntersect);
    const tool =
      this.currentTool === ToolType.Brush
            ? this.currentBrush
            : ToolType.Eraser;

    if (event.pressure === 0 && (canBeDrawn || canBeErased)) {
      gridIntersect.material.color.set('#f00');

      gridIntersect.material.map = texture.getTileTextures(tool);
      gridIntersect.material.opacity = 0.4;
      gridIntersect.material.needsUpdate = true;
    }
  };

  public setCurrentTool = (currentTool) => {
    this.currentTool = currentTool;
  }

  public setCurrentBrush = (currentBrush) => {
    this.currentBrush = currentBrush;
  }

  public setCurrentBrushOptions = (currentBrushOptions) => {
    this.currentBrushOptions = currentBrushOptions;
  }

  private get context() {
    const isLevels = this._routerServ.location.pathname.includes('levels');
    return isLevels ? createLevelContext(this) : createEditorContext(this);
  }
}

export const createWorldState = () => new WorldState(routerService, solutionRepository, fields);
