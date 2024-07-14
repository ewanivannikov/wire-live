import * as THREE from 'three';
import { tools } from "../toolbar/presenter";
import { createBrush } from "../contextBar/presenter";
import { createArrow, Field } from '../Logic/Arrow';
import { Position } from '../Logic/Position';
import { fabricArrow } from '../Logic/FabricArrow';

// Example tilemap data (replace with your actual data)
const tileData = [
  { tileId: 'Brush.1.Up', x: 2, y: 3 },
  { tileId: 'Brush.2', x: 0, y: 0 },
  { tileId: 'Brush.1.Down', x: 1, y: 6 },
  // ... more tile data
];

class TileMap {
  tileTextures;
  tileSize = 256;
  // Sparse array to store tile data (tileId: [x, y])
  tileMap = {};
  _tileGroup = new THREE.Group();

  constructor(tileTextures, tileSize, tools, tileData, field) {
    this.tileTextures = tileTextures;
    this.tileSize = tileSize;
    this.tileMap = new Map(
      Object.entries(
        tileData.reduce((acc, cur) => {
          const { tileId, x, y } = cur;
          return { ...acc, [`${x},${y}`]: tileId };
        }, {}),
      ),
    );
    this.tools = tools;
    this.init();
  }

  init = () => {
    for (const entry of this.tileMap) {
      const [x, y] = entry[0].split(',').map(Number);
      const tileId = entry[1];
      const tileTexture = this.tileTextures[tileId]; // Assuming you have a way to get the texture

      this.addSprite(tileTexture, x, y, tileId);
    }
  };

  get tileGroup() {
    return this._tileGroup;
  }

  addTile = (tile) => {
    const brush = createBrush(tools)
    const tileTexture = this.tileTextures[
      tools.currentTool === 'eraser' ? 'eraser' : brush.currentBrush
    ]; // Assuming you have a way to get the texture
    
    const [x, y] = new Position(tile.key).vector;

    if (this.tileMap.has(tile.key)) {
      this.updateSprite(tileTexture, x, y, tile);
    } else {
      this.addSprite(tileTexture, x, y, brush.currentBrush);
    }
    this.tileMap.set(tile.key, 1);
    
  };

  // addArrow = (nameType) =>
  

  removeTile = (tile) => {
    if (this.tileMap.has(tile.key)) {
      this.tileMap.delete(tile.key);
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
    sprite.name = tileId

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

export const createTileMap = (tileTextures, tileSize, field) =>
  new TileMap(tileTextures, tileSize, tools, tileData, field);
