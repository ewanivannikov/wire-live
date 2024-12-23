import { arrowToIndexTile } from "../../../modules/Logic/constants";
import { getRandomNumberExceptExceptions } from "../../../shared/utils/getRandomNumberExceptExceptions";
import { levels } from "./levels";
import { patternArrowCache } from "./patternArrowCache";

export class LevelRepository {

  public getLevelById(id = 'DeMorgan') {
    return levels[id]
  }

  public getPatternArrowCache(id = 'DeMorgan') {
    return patternArrowCache[id]
  }

  public getOutputArrowList = (id = 'DeMorgan') => {
    const list: string[] = []
    const index: Record<string, any> = {}

    Object.entries(patternArrowCache[id]).forEach(([key, value]) => {
      if (value.tileId.includes('.22.')) {
        index[key] = value;
        list.push(key)
      }
    });

    return {
      index: Object.keys(index).length ? index : null,
      list
    }
  }

  public getRequisite({id = 'DeMorgan', exceptions = []}: {id: string, exceptions?: number[]}) {
    const requisites = levels[id].requisites
    let requisite = {}
    let requisiteIndex = 0
    const requisitesKeys = Object.keys(requisites)
    const randIndex = getRandomNumberExceptExceptions(requisitesKeys.length, exceptions)
    if(randIndex instanceof Error && randIndex.cause === 'ALL_ARE_EXCEPTIONS') {
      return randIndex;
    }
    requisitesKeys.forEach((key, index) => {
      if (index === randIndex) {
        requisite = levels[id].requisites[key]
        requisiteIndex = index
      }
    })
    return {requisite, requisiteIndex}
  }

  // public getRequisiteWithKey(id = 'DeMorgan') {
  //   const requisites = levels[id].requisites
  //   let result = {}
  //   Object.keys(requisites).forEach((key, index) => {
  //     if (index === 0) {
  //       result = { [key]: levels[id].requisites[key] }
  //     }
  //   })
  //   return result
  // }

  public getLevelList = () => {
    return Object.values(levels);
  }

  public createMap(tileData) {
    const array = Array.from(tileData, ([name, value]) => {
      const [x, y] = name.split(',').map(Number);
      const tileId = ['Brush', arrowToIndexTile[value.name], value.direction].join('.')
      return ({ tileId, x, y })
    });
    console.log(array)
  }
}

export const levelRepository = new LevelRepository()
