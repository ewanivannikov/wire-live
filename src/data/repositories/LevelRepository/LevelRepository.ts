import { ArrowBase } from '../../../modules/Logic/ArrowBase';
import { arrowToIndexTile } from '../../../modules/Logic/constants';
import { cacheService } from '../../../shared';
import { createAsyncSignalQuery } from '../../../shared/services/AsyncSignal/AsyncSignalQuery';
import { generateRandomStrings } from '../../../shared/utils/generateRandomStrings';
import { levelSources } from '../../sources/level/levelSources';
import { patternArrowCache } from './patternArrowCache';

export class LevelRepository {
  constructor() {}

  public getLevelById2(id = 'Sketch') {
    const result = createAsyncSignalQuery({
      queryKey: ['level', id],

      queryFn: async () => {
        const result = await levelSources.getLevelById(id);
        return result;
      },
    });

    return result;
  }

  public getPatternArrowCache(id = 'Sketch') {
    return patternArrowCache[id];
  }

  public getOutputArrowList = (id = 'Sketch') => {
    const list: string[] = [];
    const index: Record<string, any> = {};

    Object.entries(patternArrowCache[id]).forEach(([key, value]) => {
      if (value.tileId.includes('.22.')) {
        index[key] = value;
        list.push(key);
      }
    });

    return {
      index: Object.keys(index).length ? index : null,
      list,
    };
  };

  public getLevelList = () => {
    const result = createAsyncSignalQuery({
      queryKey: ['levelList'],

      queryFn: async () => {
        const result = await levelSources.getLevels();
        return result;
      },
    });

    return result;
  }

  public createMap(tileData: Map<string, ArrowBase>) {
    const array = Array.from(tileData, ([name, value]) => {
      const [x, y] = name.split(',').map(Number);
      const tileId = [
        'Brush',
        arrowToIndexTile[value.name],
        ...value.direction ? [value.direction] : [],
        ...value.flip ? [value.flip] : [],
      ].join('.');
      return { tileId, x, y, ...value.label ? { label: value.label } : {} };
    });
    let patternArrows = {}
    let otherArrows = []
    array.forEach((sign) => {
      if (sign.tileId.includes('.21') || sign.tileId.includes('.22')) {
        patternArrows = { ...patternArrows, [generateRandomStrings()]: sign }
      } else {
        otherArrows.push(sign)
      }
    })
    console.info("patternArrows:", patternArrows);
    console.info("otherArrows:", otherArrows);
    return array
  }
}

export const levelRepository = new LevelRepository(cacheService);
