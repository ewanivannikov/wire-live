import * as THREE from 'three';
import { tools } from '../toolbar/presenter';
import { createBrush } from '../contextBar/presenter';
import { createArrow, Field } from '../Logic/Arrow';
import { Position } from '../Logic/Position';
import { arrowToIndexTile } from '../Logic/constants';
import { Tile } from '../toolbar';

// Example tilemap data (replace with your actual data)
const tileData = [
  { tileId: 'Brush.1', x: 0, y: 0 },
  { tileId: 'Brush.0.Up', x: 0, y: -1 },
  { tileId: 'Brush.2.Up', x: 0, y: -2 },
  { tileId: 'Brush.0.Up', x: 0, y: -3 },
  { tileId: 'Brush.0.Up', x: 0, y: -4 },
  { tileId: 'Brush.0.Up', x: 0, y: -5 },
  { tileId: 'Brush.1', x: 1, y: -3 }
];

const hex = {
  Red: 0xff4f00,
  Blue: 0x619eff,
  Yellow: 0xffff11,
  Orange: 0xfaa501,
};

class TileMap {
  _tileGroup = new THREE.Group();
  _stateGroup = new THREE.Group();

  constructor(
    private readonly tileTextures,
    private readonly tileSize,
    private readonly loop,
    private readonly logicField,
    private readonly tools,
    private readonly tileData,
  ) {
    const cashe = logicField.initCashe(this.tileData);


    this.init(cashe);
  }

  init = (cashe) => {
    this._stateGroup.tick = (delta, elapsed) => {

      this._stateGroup.children.forEach((sprite) => {
        const color = this.logicField.getState(sprite.key);

        if (color === 'None') {
          sprite.material.opacity = 0;
          sprite.material.needsUpdate = true;
          return
        }
        sprite.material.color = new THREE.Color(hex[color]);
        sprite.material.opacity = 1;
        sprite.material.needsUpdate = true;
      })
      this.logicField.processingLogic();
    };

    this.loop.addTick(this._stateGroup);

    for (const entry of cashe) {
      const [x, y] = entry[0].split(',').map(Number);
      const arrow = entry[1];

      const tileIdVector = [
        'Brush',
        arrowToIndexTile[arrow.name],
        ...(arrow.direction ? [arrow.direction] : []),
        ...(arrow.flip ? [arrow.flip] : []),
      ];

      const tileId = tileIdVector.join('.');
      const tileTexture = this.tileTextures[tileId]; // Assuming you have a way to get the texture

      this.addStateSprite(x, y, arrow.state);
      this.addSprite(tileTexture, x, y, tileId);

    }
  };

  get tileGroup() {
    return this._tileGroup;
  }

  get stateGroup() {
    return this._stateGroup;
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

    console.log('this.logicField.arrowCache', this.logicField.arrowCache);
    const tileName = new Tile(brush.currentBrush).vector;
    this.logicField.addArrowCache(tile.key, tileName[1]);
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

  addStateSprite = (x, y, color) => {
    let opacity = 1;
    // console.log('sprite5555', color);
    if (color === 'None') {
      opacity = 0
    }
    const colorVector = new THREE.Color(hex[color]);
    const material = new THREE.SpriteMaterial({
      color: colorVector,
      opacity,
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

    this._stateGroup.add(sprite);
  }

  updateSprite = (tileTexture, x, y, tile) => {
    this._tileGroup.remove(tile);
    this.addSprite(tileTexture, x, y);
  };

  removeSprite = (tile) => {
    this._tileGroup.remove(tile);
  };
}

export const createTileMap = (tileTextures, tileSize, loop, logicField) =>
  new TileMap(tileTextures, tileSize, loop, logicField, tools, tileData);
