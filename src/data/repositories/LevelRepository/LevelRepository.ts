import { ArrowBase } from '../../../modules/Logic/ArrowBase';
import { arrowToIndexTile } from '../../../modules/Logic/constants';
import { generateRandomStrings } from '../../../shared/utils/generateRandomStrings';
import { getRandomNumberExceptExceptions } from '../../../shared/utils/getRandomNumberExceptExceptions';
import { levels } from './levels';
import { patternArrowCache } from './patternArrowCache';

export class LevelRepository {
  public getLevelById(id = 'Sketch') {
    return levels[id];
  }

  public getUserMap(id = 'Sketch', map: Map<string, ArrowBase>) {
    for (let i = 0; i < this.getLevelById(id).length; i++) {
      map.delete(`${i.x},${i.y}`)
    }

    const userMap = this.createMap(map);
    return userMap;
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

  public getRequisite({
    id = 'Sketch',
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

export const levelRepository = new LevelRepository();
