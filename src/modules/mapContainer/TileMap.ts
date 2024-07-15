import * as THREE from 'three';
import { tools } from '../toolbar/presenter';
import { createBrush } from '../contextBar/presenter';
import { createArrow, Field } from '../Logic/Arrow';
import { Position } from '../Logic/Position';
import { fabricArrow } from '../Logic/FabricArrow';
import { Brush } from 'lucide-solid';
import { arrowToIndexTile } from '../Logic/constants';

// Example tilemap data (replace with your actual data)
const tileData = [
  { tileId: 'Brush.0.Up', x: 2, y: 3 },
  { tileId: 'Brush.1', x: 0, y: 0 },
  { tileId: 'Brush.0.Down', x: 1, y: 6 },
  // ... more tile data
];

class TileMap {
  _tileGroup = new THREE.Group();

  constructor(
    private readonly tileTextures,
    private readonly tileSize,
    private readonly stateField,
    private readonly logicField,
    private readonly tools,
    private readonly tileData,
  ) {
    const cashe = logicField.initCashe(this.tileData);
    console.log('cashe', cashe);

    this.init(cashe);
  }

  init = (cashe) => {
    for (const entry of cashe) {
      const [x, y] = entry[0].split(',').map(Number);
      const arrow = entry[1];

      const tileIdVector = ['Brush', arrowToIndexTile[arrow.name], ...arrow.direction ? [arrow.direction] : [], ...arrow.flip ? [arrow.flip] : []];

      const tileId = tileIdVector.join('.');
      const tileTexture = this.tileTextures[tileId]; // Assuming you have a way to get the texture

      this.addSprite(tileTexture, x, y, tileId);
    }
  };

  get tileGroup() {
    return this._tileGroup;
  }

  public updateTile = (tile) => {
    const brush = createBrush(this.tools);
    const tileTexture =
      this.tileTextures[
      this.tools.currentTool === 'Eraser' ? 'Eraser' : brush.currentBrush
      ]; // Assuming you have a way to get the texture

    const [x, y] = new Position(tile.key).vector;

    if (this.logicField.arrowCache.has(tile.key)) {
      this.updateSprite(tileTexture, x, y, tile);
    } else {
      this.addSprite(tileTexture, x, y, brush.currentBrush);
    }
    this.logicField.arrowCache.set(tile.key, 1);
  };

  removeTile = (tile) => {
    console.log('this.logicField', this.logicField);
    if (this.logicField.arrowCache.has(tile.key)) {
      this.logicField.arrowCache.delete(tile.key);
      this.removeSprite(tile);
    }
  };

  addSprite = (tileTexture, x, y, tileId) => {
    const material = new THREE.SpriteMaterial({
      map: tileTexture,
      transparent: true,
    });
    const sprite = new THREE.Sprite(material);

    const tileHalfShift = this.tileSize / 2;
    sprite.position.set(
      x * this.tileSize + tileHalfShift,
      -y * this.tileSize - tileHalfShift,
      0,
    );
    sprite.scale.set(this.tileSize, this.tileSize, 0);
    sprite.key = `${x},${y}`;
    sprite.name = tileId;

    this._tileGroup.add(sprite);
  };

  updateSprite = (tileTexture, x, y, tile) => {
    this._tileGroup.remove(tile);
    this.addSprite(tileTexture, x, y);
  };

  removeSprite = (tile) => {
    this._tileGroup.remove(tile);
  };
}

export const createTileMap = (tileTextures, tileSize, stateField, logicField) =>
  new TileMap(tileTextures, tileSize, stateField, logicField, tools, tileData);
