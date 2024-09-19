import { arrowToIndexTile } from "../../../modules/Logic/constants";
import { levels } from "./levels";

export class LevelRepository {
  public getMapById(id = 'DeMorgan') {
    return levels[id]
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
