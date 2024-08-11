import * as THREE from 'three';
import { brushes } from '../brushes';
import { Tile, DirectionType } from '../toolbar';

class TileSet {
  _tileTextures = Object.keys(brushes).reduce((acc, current) => {
    acc[current] = new THREE.Texture();
    return acc;
  }, {}); // Object to store tile textures

  tileSize = 256;
  tilesetImg = null;

  constructor(tilesetImg, tileSize) {
    this.tilesetImg = tilesetImg;
    this.tileSize = tileSize;

    this.init();
  }

  init = () => {
    const textureLoader = new THREE.TextureLoader();

    const onload = (texture) => {
      Object.keys(brushes).forEach((tileId) => {
        const { u, v, u2, v2, image } = this.cropViewport(tileId, texture);

        const rotationAngle = new Tile(tileId).vector[2] || DirectionType.Up;
        const numberRotation = {
          [DirectionType.Up]: 0,
          [DirectionType.Left]: 1,
          [DirectionType.Down]: 2,
          [DirectionType.Right]: 3,
        };
        const positionRotation = [
          [0, 0],
          [1 / 8, 0],
          [1 / 8, -1 / 8],
          [0, -1 / 8],
        ];
        const indexRotation = numberRotation[rotationAngle];

        this._tileTextures[tileId].image = image;
        this._tileTextures[tileId].offset.set(
          u + positionRotation[indexRotation][0],
          v + positionRotation[indexRotation][1],
        );
        this._tileTextures[tileId].repeat.set(u2 - u, v2 - v); // это масштабирование
        this._tileTextures[tileId].center.set(0, 1);

        this._tileTextures[tileId].rotation = (indexRotation * Math.PI) / 2;

        this._tileTextures[tileId].needsUpdate = true;
      });
    };

    // Create a texture for the tiles (replace with your actual texture)
    textureLoader.load(this.tilesetImg, onload);
  };

  cropViewport = (tileId, tilesetTexture) => {
    const tilesetWidth = tilesetTexture.image.width;
    const tilesetHeight = tilesetTexture.image.height;
    // Calculate tile position in the tileset image (assuming grid layout)

    const indexInAtlas = new Tile(tileId).vector[1];
    const tileXShiftPx = (indexInAtlas % 8) * this.tileSize; // 4 tiles per row in the example
    const tileYShiftPx = -Math.floor(indexInAtlas / 8) * this.tileSize;

    // левая верхняя точка вьюпорта обрезки в процентах
    const u = tileXShiftPx / tilesetWidth;
    const v = tileYShiftPx / tilesetHeight;
    // правая нижняя точка вьюпорта обрезки в процентах
    const u2 = (tileXShiftPx + this.tileSize) / tilesetWidth;
    const v2 = (tileYShiftPx + this.tileSize) / tilesetHeight;

    return { u, v, u2, v2, image: tilesetTexture.image };
  };

  get tileTextures() {
    return this._tileTextures;
  }

  getTileTextures = (key) => {
    return this._tileTextures[key];
  };
}

export const createTileSet = (tilesetImg, tileSize) =>
  new TileSet(tilesetImg, tileSize);
