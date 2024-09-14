import { arrowToIndexTile } from "../../../modules/Logic/constants";
import { sources } from "./sources";

export class MapsRepository {
  public getMapById(id='DeMorgan') {
    return sources[id]
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

export const mapsRepository = new MapsRepository()
