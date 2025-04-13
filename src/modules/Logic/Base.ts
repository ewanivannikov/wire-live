import { fabricArrow } from './FabricArrow';
import { fabricPatternArrow } from './FabricPatternArrow';
import { Tile } from '../toolbar';
import { indexTileToArrow } from './constants';
import { Direction, Flip } from './types';
import { ArrowBase } from './ArrowBase';
import { emitter } from '../../shared/services/EventEmitterService';

export const solutionChecked = Symbol('solutionChecked');
export const solutionPercentage = Symbol('solutionPercentage');
export enum states {
  Earth = 'Earth',
  Wait = 'Wait',
  Mars = 'Mars',
  Moon = 'Moon',
  Venus = 'Venus'
}

export class Fields {
  // key - Position
  public signalCache = new Map<string, number>(); // ключ: позиция х,y, значение 1
  public newSignalCache = new Map();
  public stateCache = new Map<string, states>(); // ключ: позиция х,y
  public arrowCache = new Map<string, ArrowBase>(); // arrow
  public paused = false;

  getSignal(key: string) {
    if (!this.signalCache.has(key)) {
      return 0;
    }
    return this.signalCache.get(key);
  }

  getState(key: string) {
    if (!this.stateCache.has(key)) {
      return 'None';
    }
    return this.stateCache.get(key);
  }

  public getArrow(key: string) {
    if (!this.arrowCache.has(key)) {
      return;
    }
    return this.arrowCache.get(key);
  }

  public addSignal(key: string, signal: number) {
    if (!this.newSignalCache.has(key)) {
      this.newSignalCache.set(key, signal);
    } else {
      const singalIn = this.newSignalCache.get(key);
      this.newSignalCache.set(key, signal + singalIn);
    }
  }

  public addState(key: string, arrow: ArrowBase) {
    this.stateCache.set(key, arrow.state);
  }

  public addArrow(key: string, arrow: ArrowBase) {
    this.arrowCache.set(key, arrow);
  }

  public addArrowCache(
    key: string,
    index: number,
    direction?: Direction,
    flip?: Flip,
    options?: any,
  ) {
    const name = indexTileToArrow[index];

    if (index >= 21 && index <= 22) {
      this.addArrow(
        key,
        fabricPatternArrow(
          name,
          key,
          options.pattern,
          direction,
          options.hasCycle,
          options.initialValue,
          options.label,
          options?.waiting,
        ),
      );
    } else {
      this.addArrow(key, fabricArrow(name, key, direction, flip));
    }
  }

  public clearStates = () => {
    this.stateCache.clear();
  }

  public clearSignals = () => {
    this.signalCache.clear();
  }

  public clearArrowsStates = () => {
    this.arrowCache.forEach((arrow, _) => {
      arrow.state = 'None';
    });
  }

  private clearArrowCache = () => {
    this.arrowCache.clear();
  }

  public clearAll = () => {
    this.clearStates();
    this.clearSignals();
    this.clearArrowsStates();
    this.clearPatternArrows();
    this.clearArrowCache();
  }

  public clearPatternArrows() {
    this.arrowCache.forEach((arrow, _) => {
      if (arrow.name === 'OutputArrow' || arrow.name === 'InputArrow') {
        arrow.index = 0;
        arrow.binaryArray = [];
      }
      if (arrow.name === 'OutputArrow') {
        arrow.isValidIn = true;
        arrow.patternValidation = [];
      }
    });
  }

  public updateSignals() {
    this.signalCache = new Map(this.newSignalCache);
    this.newSignalCache.clear();
  }

  public initCashe(tileData) {
    tileData.forEach((tile) => {
      const { tileId, x, y, ...options } = tile;
      const value = new Tile(tileId).vector;
      this.addArrowCache(`${x},${y}`, value[1], value[2], value[3], options);
    });

    return this.arrowCache;
  }

  public updatePause() {
    this.paused = !this.paused;
  }

  public processingLogic = (cb) => {
    if (!this.paused) {
      const outputs: string[] = [];
      let percentage: number = 0;
      this.clearStates();

      this.arrowCache.forEach((arrow) => {
        arrow.activeStates(this);
        arrow.updateState(this);
      });

      this.updateSignals();

      this.arrowCache.forEach((arrow) => {
        arrow.conditionStates(this);

        if (arrow.name === 'OutputArrow') {
          outputs.push(arrow.validated);
          percentage += arrow.completionPercentage;
        }

        cb(arrow);
      });
      
      emitter.emit(solutionPercentage, percentage/outputs.length);

      if (outputs.includes('rejected')) {
        emitter.emit(solutionChecked, 'rejected');
      } else if (outputs.every((item) => item === 'resolved')) {
        emitter.emit(solutionChecked, 'resolved');
      }
    }
  };
}

export const fields = new Fields();
