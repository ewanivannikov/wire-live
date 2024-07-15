import { Position, createPosition } from './Position';
import { fabricArrow } from './FabricArrow';
import { Tile } from '../toolbar';
import { indexTileToArrow } from './constants';
import { Direction } from './types';
import { ArrowBase } from './ArrowBase';



export class Fields {
  // key - Position
  public signalCache = new Map(); // integer
  public stateCache = new Map(); // string(state)
  public arrowCache = new Map(); // arrow

  getSignal(key: string) {
    const pos = createPosition(key);
    if (!this.signalCache.has(pos.vector)) {
      return 0;
    }
    return this.signalCache.get(pos.vector);
  }

  getState(key: string) {
    const pos = createPosition(key);
    if (!this.stateCache.has(pos.vector)) {
      return;
    }
    return this.stateCache.get(pos.vector);
  }

  getArrow(key: string) {
    const pos = createPosition(key);
    if (!this.arrowCache.has(pos.vector)) {
      return;
    }
    return this.arrowCache.get(pos.vector);
  }

  addSignal(key: string, signal: number) {
    const pos = createPosition(key);
    const singalIn = this.signalCache.get(pos.vector);
    this.signalCache.set(pos.vector, signal + singalIn);
  }

  addState(key: string, arrow: ArrowBase) {
    const pos = createPosition(key);
    this.stateCache.set(pos.vector, arrow.state);
  }

  addArrow(key: string, arrow: ArrowBase) {
    const pos = createPosition(key);
    this.arrowCache.set(pos.coordinates, arrow);
  }

  clearSignals() {
    this.signalCache.clear();
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
}

export const createFields = () => new Fields();
