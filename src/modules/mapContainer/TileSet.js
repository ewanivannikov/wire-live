import * as THREE from 'three';
import { brushes } from '../brushes';

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
        const { u, v, u2, v2, image } = this.getUV(tileId, texture);

        const rotationAngle = tileId.split('.')[1] || 'up';
        const numberRotation = {
          up: 0,
          left: 1,
          down: 2,
          right: 3,
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

  getUV = (tileId, tilesetTexture) => {
    const tilesetWidth = tilesetTexture.image.width;
    const tilesetHeight = tilesetTexture.image.height;
    // Calculate tile position in the tileset image (assuming grid layout)
    const indexInAtlas = Number(tileId.split('.')[0]) - 1;
    const tileXShiftPx = (indexInAtlas % 8) * this.tileSize; // 4 tiles per row in the example
    const tileYShiftPx = Math.floor(indexInAtlas / 8) * this.tileSize;

    // Calculate UVs for the tile
    const u = tileXShiftPx / tilesetWidth;
    const v = tileYShiftPx / tilesetHeight;

    const u2 = (tileXShiftPx + this.tileSize) / tilesetWidth;
    const v2 = (tileYShiftPx + this.tileSize) / tilesetHeight;

    return { u, v, u2, v2, image: tilesetTexture.image };
  };

  get tileTextures() {
    return this._tileTextures;
  }

  getTileTextures = (index) => {
    return this._tileTextures[index];
  };
}

export const createTileSet = (tilesetImg, tileSize) =>
  new TileSet(tilesetImg, tileSize);
