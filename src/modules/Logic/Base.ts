import { fabricArrow } from './FabricArrow';
import { Tile } from '../toolbar';
import { indexTileToArrow } from './constants';
import { Direction, Flip } from './types';
import { ArrowBase } from './ArrowBase';

export class Fields {
  // key - Position
  public signalCache = new Map(); // integer
  public newSignalCache = new Map();
  public stateCache = new Map(); // string(state)
  public arrowCache = new Map(); // arrow

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
  ) {
    const name = indexTileToArrow[index];
    const flipBoolean = flip === '<';

    this.addArrow(key, fabricArrow(name, key, direction, flipBoolean));
  }

  clearStates() {
    this.stateCache.clear();
  }

  updateSignals() {
    this.signalCache = new Map(this.newSignalCache);
    this.newSignalCache.clear();
  }

  initCashe(tileData) {
    tileData.forEach((tile) => {
      const { tileId, x, y } = tile;
      const value = new Tile(tileId).vector;
      this.addArrow(
        `${x},${y}`,
        fabricArrow(indexTileToArrow[value[1]], `${x},${y}`, value[2]),
      );
    });

    return this.arrowCache;
  }

  processingLogic() {
    this.clearStates();

    this.arrowCache.forEach((arrow) => {
      arrow.activeStates(this);
      arrow.updateState(this)
    })

    this.updateSignals();

    this.arrowCache.forEach((arrow) => {
      arrow.conditionStates(this);
    })

    // console.log('tick', this.stateCache);

  }
}

export const createFields = () => new Fields();
