import { arrowToIndexTile } from "../../../modules/Logic/constants";

export class MapsRepository {
  public getMapById() {
    return [
      {
        "tileId": "Brush.1.",
        "x": -2,
        "y": 1
      },
      {
        "tileId": "Brush.4.Right",
        "x": -1,
        "y": 0
      },
      {
        "tileId": "Brush.4.Right",
        "x": -1,
        "y": -1
      },
      {
        "tileId": "Brush.4.Right",
        "x": -1,
        "y": -2
      },
      {
        "tileId": "Brush.4.Right",
        "x": -1,
        "y": -3
      },
      {
        "tileId": "Brush.4.Right",
        "x": -1,
        "y": -4
      },
      {
        "tileId": "Brush.0.Right",
        "x": 0,
        "y": -4
      },
      {
        "tileId": "Brush.0.Right",
        "x": 1,
        "y": -4
      },
      {
        "tileId": "Brush.0.Right",
        "x": 2,
        "y": -4
      },
      {
        "tileId": "Brush.0.Right",
        "x": 3,
        "y": -4
      },
      {
        "tileId": "Brush.0.Right",
        "x": 4,
        "y": -4
      },
      {
        "tileId": "Brush.0.Right",
        "x": 5,
        "y": -4
      },
      {
        "tileId": "Brush.0.Right",
        "x": 5,
        "y": -3
      },
      {
        "tileId": "Brush.0.Right",
        "x": 5,
        "y": -2
      },
      {
        "tileId": "Brush.0.Right",
        "x": 5,
        "y": -1
      },
      {
        "tileId": "Brush.0.Right",
        "x": 5,
        "y": 0
      },
      {
        "tileId": "Brush.0.Right",
        "x": 4,
        "y": 0
      },
      {
        "tileId": "Brush.0.Right",
        "x": 3,
        "y": 0
      },
      {
        "tileId": "Brush.0.Right",
        "x": 2,
        "y": 0
      },
      {
        "tileId": "Brush.0.Right",
        "x": 1,
        "y": 0
      },
      {
        "tileId": "Brush.0.Right",
        "x": 0,
        "y": 0
      },
      {
        "tileId": "Brush.0.Right",
        "x": 0,
        "y": -1
      },
      {
        "tileId": "Brush.0.Right",
        "x": 0,
        "y": -2
      },
      {
        "tileId": "Brush.0.Right",
        "x": 1,
        "y": -2
      },
      {
        "tileId": "Brush.0.Right",
        "x": 1,
        "y": -3
      },
      {
        "tileId": "Brush.0.Right",
        "x": 2,
        "y": -3
      },
      {
        "tileId": "Brush.0.Right",
        "x": 3,
        "y": -3
      },
      {
        "tileId": "Brush.0.Right",
        "x": 4,
        "y": -3
      },
      {
        "tileId": "Brush.0.Right",
        "x": 4,
        "y": -2
      },
      {
        "tileId": "Brush.0.Right",
        "x": 4,
        "y": -1
      },
      {
        "tileId": "Brush.0.Right",
        "x": 3,
        "y": -1
      },
      {
        "tileId": "Brush.0.Right",
        "x": 2,
        "y": -1
      },
      {
        "tileId": "Brush.0.Right",
        "x": 2,
        "y": -2
      },
      {
        "tileId": "Brush.0.Right",
        "x": 3,
        "y": -2
      },
      {
        "tileId": "Brush.0.Right",
        "x": 1,
        "y": -1
      },
      {
        "tileId": "Brush.0.Right",
        "x": 0,
        "y": -3
      },
      {
        "tileId": "Brush.18.Up",
        "x": -2,
        "y": 0
      },
      {
        "tileId": "Brush.18.Up",
        "x": -2,
        "y": -1
      },
      {
        "tileId": "Brush.18.Up",
        "x": -2,
        "y": -2
      },
      {
        "tileId": "Brush.18.Up",
        "x": -2,
        "y": -3
      },
      {
        "tileId": "Brush.18.Up",
        "x": -2,
        "y": -4
      }
    ];
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
