import { fabricArrow } from './FabricArrow';
import { fabricPatternArrow } from './FabricPatternArrow';
import { Tile } from '../toolbar';
import { indexTileToArrow } from './constants';
import { Direction, Flip } from './types';
import { ArrowBase } from './ArrowBase';
import { makeObservable, observable, reaction, runInAction } from 'mobx';

export class Fields {
  // key - Position
  public signalCache = new Map<string, number>(); // integer
  public newSignalCache = new Map();
  public stateCache = new Map(); // string(state)
  public arrowCache = new Map(); // arrow
  public paused = false;
  public solved = 'waiting';
  public solved0 = 'waiting';
  constructor() {
    makeObservable(this, {
      solved: observable,
    })
  }

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

  getArrow(key: string) {
    if (!this.arrowCache.has(key)) {
      return;
    }
    return this.arrowCache.get(key);
  }

  addSignal(key: string, signal: number) {
    if (!this.newSignalCache.has(key)) {
      this.newSignalCache.set(key, signal);
    } else {
      const singalIn = this.newSignalCache.get(key);
      this.newSignalCache.set(key, signal + singalIn);
    }
  }

  addState(key: string, arrow: ArrowBase) {
    this.stateCache.set(key, arrow.state);
  }

  addArrow(key: string, arrow: ArrowBase) {
    this.arrowCache.set(key, arrow);
  }

  addArrowCache(
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
          options?.waiting,
        ),
      );
    } else {
      this.addArrow(key, fabricArrow(name, key, direction, flip));
    }
  }

  clearStates() {
    this.stateCache.clear();
  }

  clearSignals() {
    this.signalCache.clear();
  }

  clearArrowsStates() {
    this.arrowCache.forEach((arrow, _) => {
      arrow.state = 'None';
    });
  }

  updateSignals() {
    this.signalCache = new Map(this.newSignalCache);
    this.newSignalCache.clear();
  }

  initCashe(tileData) {
    tileData.forEach((tile) => {
      const { tileId, x, y, ...options } = tile;
      const value = new Tile(tileId).vector;
      this.addArrowCache(`${x},${y}`,
        value[1],
        value[2],
        value[3],
        options
      );
    });

    return this.arrowCache;
  }

  updatePause() {
    this.paused = !this.paused;
  }

  public checkSolution = async () => {
    return new Promise((resolve, reject) => {
      const dispose = reaction(
        () => this.solved,
        solved => {
          console.log("Result:", this.solved)
          if (solved === 'rejected') {
            reject(new Error('Mars'));
          }
          if (solved === 'resolved') {
            resolve(true);
          }
          dispose(); // Dispose of the reaction once the promise is settled
        }
      )
    });
  }

  public processingLogic = () => {
    if (!this.paused) {
      runInAction(() => { this.solved = this.solved0; });
      const outputs: string[] = [];
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
        }
      });

      runInAction(() => {
        if (outputs.includes('rejected')) { this.solved0 = 'rejected'; }
        else if (outputs.every((item) => item === 'resolved')) { this.solved0 = 'resolved'; }
        else { this.solved0 = 'waiting'; }
      })
    }
  }
}

export const fields = new Fields();
