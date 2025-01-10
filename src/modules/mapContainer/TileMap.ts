import * as THREE from 'three';
import { tools } from '../toolbar/presenter';
import { brush } from '../contextBar/presenter';
import { Position } from '../Logic/Position';
import { arrowToIndexTile } from '../Logic/constants';
import { Tile } from '../toolbar';
import { Texture } from 'three';
import type { TileId } from '../../data';
import { Fields } from '../Logic/Base';
import { WorldState } from '../worldState/viewModel';

const hex = {
  Earth: 0x17d3e8,
  Saturn: 0x00a7bb,
  Venus: 0x3dc13c,
  Mars: 0xf13637,
  Sun: 0xffc732,
  Wall: 0xcccccc,
};

class TileMap {
  _tileGroup = new THREE.Group();

  constructor(
    private readonly tileTextures,
    private readonly tileSize,
    private readonly loop,
    private readonly logicField: Fields,
    private readonly _worldState: WorldState,
    private readonly grid,
    private readonly map,
  ) {
    const cashe = logicField.initCashe(map);

    this.init(cashe);
  }

  private addStateSpriteByArrow = (arrow) => {
    const sprite = this.grid.group.getObjectByName(arrow.key);
    if (arrow.state === 'None' || arrow.state === 'Wait') {
      sprite.material.opacity = 0;
      sprite.material.needsUpdate = true;
      return;
    }
    sprite.material.color = new THREE.Color(hex[arrow.state]);
    sprite.material.opacity = 1;
    sprite.material.needsUpdate = true;
  };

  init = (cashe) => {
    this.grid.group.tick = () => {
      this.logicField.processingLogic(this.addStateSpriteByArrow);
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
    return tile;
  };

  public updateTile = (tile, currentTool) => {
    const tileTexture =
      this.tileTextures[currentTool]; // Assuming you have a way to get the texture

    const [x, y] = new Position(tile.name).vector;
    const currentBrush = this._worldState.currentBrush
    const currentBrushOptions = this._worldState.currentBrushOptions

    if (this.logicField.arrowCache.has(tile.name)) {
      this.updateSprite(
        tileTexture,
        x,
        y,
        currentBrush,
        tile,
        currentBrushOptions,
      );
    } else {
      const hasSprite = this.hasSprite(tile, currentBrush);

      if (!hasSprite) {
        this.addStateSprite(x, y, 'None');
        this.addSprite(
          tileTexture,
          x,
          y,
          currentBrush,
          currentBrushOptions,
        );
      }
    }

    const tileName = new Tile(currentBrush).vector;

    this.logicField.addArrowCache(
      tile.name,
      tileName[1],
      tileName[2],
      tileName[3],
      currentBrushOptions,
    );
  };

  removeTile = (tile) => {
    if (this.logicField.arrowCache.has(tile.name)) {
      const [x, y] = new Position(tile.name).vector;
      this.addStateSprite(x, y, 'None');
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
    if (color === 'None') {
      opacity = 0;
    }
    const sprite = this.grid.group.getObjectByName(`${x},${y}`);
    sprite.material.opacity = opacity;
    sprite.material.color = new THREE.Color(hex[color]);
    sprite.material.needsUpdate = true;
  };

  public clearStateSprite = () => {
    const sprite = this.grid.group.getObjectByName(arrow.key);
    sprite.material.opacity = 0;
    sprite.material.color = new THREE.Color(hex.None);
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

export const createTileMap = (
  tileTextures,
  tileSize,
  loop,
  logicField: Fields,
  grid,
  map: object[],
  worldState: WorldState
) => new TileMap(tileTextures, tileSize, loop, logicField, worldState, grid, map);
