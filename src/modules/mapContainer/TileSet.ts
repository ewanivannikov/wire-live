import * as THREE from 'three';
import { Texture } from 'three';
import { brushRepository } from '../../data';
import { Tile, DirectionType } from '../toolbar';

class TileSet {
  private _tileTextures: Record<string, Texture> = Object.keys(brushRepository.brushList).reduce(
    (acc, current) => {
      acc[current] = new Texture();
      return acc;
    },
    {} as Record<string, Texture>,
  ); // Object to store tile textures

  constructor(
    private readonly tilesetImg: string,
    private readonly tileSize = 256,
  ) {
    this.init();
  }

  init = () => {
    const textureLoader = new THREE.TextureLoader();

    const onload = (texture: Texture) => {
      Object.keys(brushRepository.brushList).forEach((tileId) => {
        const { u, v, u2, v2, image } = this.cropViewport(tileId, texture);

        const flip = new Tile(tileId).vector[3];
        const hasFlip = Boolean(flip);
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
        const positionRotationX = positionRotation[indexRotation][0];

        this._tileTextures[tileId].image = image;
        this._tileTextures[tileId].offset.x =
          hasFlip && flip === '<'
            ? u + 1 / 8 - positionRotationX
            : u + positionRotationX;
        this._tileTextures[tileId].offset.y =
          v + positionRotation[indexRotation][1];

        // это масштабирование
        this._tileTextures[tileId].repeat.x =
          hasFlip && flip === '<' ? -(u2 - u) : u2 - u;
        this._tileTextures[tileId].repeat.y = v2 - v;
        this._tileTextures[tileId].center.set(0, 1);

        this._tileTextures[tileId].rotation = (indexRotation * Math.PI) / 2;

        this._tileTextures[tileId].needsUpdate = true;
      });
    };

    // Create a texture for the tiles (replace with your actual texture)
    textureLoader.load(this.tilesetImg, onload);
  };

  cropViewport = (tileId, tilesetTexture: Texture) => {
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

export const createTileSet = (tilesetImg: string, tileSize: number) =>
  new TileSet(tilesetImg, tileSize);
