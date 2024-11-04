import { arrowToIndexTile } from "../../../modules/Logic/constants";
import { levels } from "./levels";
import { patternArrowCache } from "./patternArrowCache";

export class LevelRepository {

  public getLevelById(id = 'DeMorgan') {
    return levels[id]
  }

  public getPatternArrowCache(id = 'DeMorgan') {
    return patternArrowCache[id]
  }

  //public getOutputArrowKeys

  public getRequisite(id = 'DeMorgan') {
    const requisites = levels[id].requisites
    let result = {}
    Object.keys(requisites).forEach((key, index) => {
      if (index === 0) {
        result = levels[id].requisites[key]
      }
    })
    return result
  }

  public getRequisiteWithKey(id = 'DeMorgan') {
    const requisites = levels[id].requisites
    let result = {}
    Object.keys(requisites).forEach((key, index) => {
      if (index === 0) {
        result = { [key]: levels[id].requisites[key] }
      }
    })
    return result
  }

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
