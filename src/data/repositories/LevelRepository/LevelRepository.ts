import { ArrowBase } from '../../../modules/Logic/ArrowBase';
import { arrowToIndexTile } from '../../../modules/Logic/constants';
import { getRandomNumberExceptExceptions } from '../../../shared/utils/getRandomNumberExceptExceptions';
import { levels } from './levels';
import { patternArrowCache } from './patternArrowCache';

export class LevelRepository {
  public getLevelById(id = 'DeMorgan') {
    return levels[id];
  }

  public getUserMap(id = 'DeMorgan', map: Map<string, ArrowBase>) {
    for (let i = 0; i < this.getLevelById(id).length; i++) {
      map.delete(`${i.x},${i.y}`)
    }

    const userMap = this.createMap(map);
    return userMap;
  }

  public getPatternArrowCache(id = 'DeMorgan') {
    return patternArrowCache[id];
  }

  public getOutputArrowList = (id = 'DeMorgan') => {
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

  public getRequisite({
    id = 'DeMorgan',
    exceptions = [],
  }: {
    id: string;
    exceptions?: number[];
  }) {
    const requisites = levels[id].requisites;
    let requisite = {};
    let requisiteIndex = 0;
    const requisitesKeys = Object.keys(requisites);
    const randIndex = getRandomNumberExceptExceptions(
      requisitesKeys.length,
      exceptions,
    );
    if (
      randIndex instanceof Error &&
      randIndex.cause === 'ALL_ARE_EXCEPTIONS'
    ) {
      return randIndex;
    }
    requisitesKeys.forEach((key, index) => {
      if (index === randIndex) {
        requisite = levels[id].requisites[key];
        requisiteIndex = index;
      }
    });
    return { requisite, requisiteIndex };
  }

  public getLevelList = () => {
    return Object.values(levels);
  };

  public createMap(tileData: Map<string, ArrowBase>) {
    const array = Array.from(tileData, ([name, value]) => {
      const [x, y] = name.split(',').map(Number);
      const tileId = [
        'Brush',
        arrowToIndexTile[value.name],
        value.direction,
      ].join('.');
      return { tileId, x, y };
    });
    console.log(array);
    return array
  }
}

export const levelRepository = new LevelRepository();
