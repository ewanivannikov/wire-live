import * as THREE from 'three';
import { tools } from '../toolbar/presenter';
import { createBrush } from '../contextBar/presenter';
import { Position } from '../Logic/Position';
import { arrowToIndexTile } from '../Logic/constants';
import { Tile } from '../toolbar';
import { Texture } from 'three';
import { TileId } from '../brushes';
import { MapsRepository, mapsRepository } from '../../data';
import { Fields } from '../Logic/Base';

// Example tilemap data (replace with your actual data)
// const tileData = [
//   { tileId: 'Brush.1', x: 0, y: 0 },
//   { tileId: 'Brush.0.Up', x: 0, y: -1 },
//   { tileId: 'Brush.3.Up', x: 0, y: -2 },
//   { tileId: 'Brush.0.Up', x: 0, y: -3 },
//   { tileId: 'Brush.0.Up', x: 0, y: -4 },
//   { tileId: 'Brush.0.Up', x: 0, y: -5 },
// ];

const hex = {
  Earth: 0xff4f00,
  Saturn: 0x619eff,
  Sun: 0xffff11,
  Mars: 0xfaa501,
};

class TileMap {
  _tileGroup = new THREE.Group();

  constructor(
    private readonly tileTextures,
    private readonly tileSize,
    private readonly loop,
    private readonly logicField: Fields,
    private readonly tools,
    private readonly mapsRepo: MapsRepository,
    private readonly grid,
  ) {
    const cashe = logicField.initCashe(this.mapsRepo.getMapById());

    this.init(cashe);
  }

  init = (cashe) => {
    this.grid.group.tick = () => {
      this.logicField.stateCache.forEach((value, key) => {
        const sprite = this.grid.group.getObjectByName(key);

        if (value === 'None') {
          sprite.material.opacity = 0;
          sprite.material.needsUpdate = true;
          return;
        }
        sprite.material.color = new THREE.Color(hex[value]);
        sprite.material.opacity = 1;
        sprite.material.needsUpdate = true;
      });

      this.logicField.processingLogic(false);
    };

    this.loop.addTick(this.grid.group);

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
      const tileTexture = this.tileTextures[tileId];

      this.addStateSprite(x, y, arrow.state);
      this.addSprite(tileTexture, x, y, tileId);
    }
  };

  get tileGroup() {
    return this._tileGroup;
  }

  public onPointerChange = (tile) => {
    return tile
  };

  public updateTile = (tile) => {
    const brush = createBrush(this.tools);

    const tileTexture =
      this.tileTextures[
      this.tools.currentTool === 'Eraser' ? 'Eraser' : brush.currentBrush
      ]; // Assuming you have a way to get the texture

    const [x, y] = new Position(tile.name).vector;

    if (this.logicField.arrowCache.has(tile.name)) {
      this.updateSprite(
        tileTexture,
        x,
        y,
        brush.currentBrush,
        tile,
        brush.currentBrushOptions,
      );
    } else {
      const hasSprite = this.hasSprite(tile, brush.currentBrush);

      if (!hasSprite) {
        this.addStateSprite(x, y, 'None');
        this.addSprite(
          tileTexture,
          x,
          y,
          brush.currentBrush,
          brush.currentBrushOptions,
        );
      }
    }

    const tileName = new Tile(brush.currentBrush).vector;

    this.logicField.addArrowCache(
      tile.name,
      tileName[1],
      tileName[2],
      tileName[3],
      brush.currentBrushOptions,
    );
  };

  removeTile = (tile) => {
    if (this.logicField.arrowCache.has(tile.name)) {
      this.logicField.arrowCache.delete(tile.name);
      this.removeSprite(tile);
    }
  };

  hasSprite = (tile, tileId) => {
    return tile.userData.type === tileId;
  };

  addSprite = (tileTexture: Texture, x, y, tileId: TileId, brushOptions) => {
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
    sprite.scale.x = this.tileSize;
    sprite.scale.y = this.tileSize;
    sprite.name = `${x},${y}`;
    sprite.userData = { type: tileId, ...brushOptions };

    this._tileGroup.add(sprite);
  };

  addStateSprite = (x, y, color) => {
    let opacity = 1;
    // console.log('sprite5555', color);
    if (color === 'None') {
      opacity = 0;
    }
    const sprite = this.grid.group.getObjectByName(`${x},${y}`);
    sprite.material.opacity = opacity;
    sprite.material.color = new THREE.Color(hex[color]);
    sprite.material.needsUpdate = true;
  };

  updateSprite = (tileTexture: Texture, x, y, tileId, tile, brushOptions) => {
    this._tileGroup.remove(tile);
    this.addSprite(tileTexture, x, y, tileId, brushOptions);
  };

  removeSprite = (tile) => {
    this._tileGroup.remove(tile);
  };
}

export const createTileMap = (tileTextures, tileSize, loop, logicField: Fields, grid) =>
  new TileMap(tileTextures, tileSize, loop, logicField, tools, mapsRepository, grid);
