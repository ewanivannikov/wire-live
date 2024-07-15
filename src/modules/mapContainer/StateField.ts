import * as THREE from 'three';
import { Loop } from './systems';

const tileData = {
  '2,3': 'red',
  '0,0': 'blue',
  '1,6': 'yellow',
  '2,4': 'orange',
};

const hex = {
  red: 0xff4f00,
  blue: 0x619eff,
  yellow: 0xffff11,
  orange: 0xfaa501,
};

class StateField {
  private tileMap = new Map<string, string>();
  private group = new THREE.Group();
  // Sparse array to store tile data (tilePosition: Brush.Type.DirectionType)
  cashe = {};

  constructor(
    private readonly tileSize: number,
    private readonly loop: Loop,
    tileData,
  ) {
    this.tileMap = new Map(Object.entries(tileData));

    this.init();
  }

  init = () => {
    this.tileMap.forEach((value: string, key: string) => {
      const [x, y] = key.split(',').map(Number);
      const color = value;

      this.addSprite(x, y, color);
    });
  };

  initCashe = (tileData) => {
    this.cashe = new Map(
      Object.entries(
        tileData.reduce((acc, cur) => {
          const { tileId, x, y } = cur;
          return { ...acc, [`${x},${y}`]: tileId };
        }, {}),
      ),
    );
    return this.cashe;
  };

  private addSprite = (x, y, color) => {
    const colorVector = new THREE.Color(hex[color]);
    const material = new THREE.SpriteMaterial({
      color: colorVector,
      opacity: 0,
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

    this.loop.addTick(sprite);

    sprite.tick = (delta, elapsed) => {
      const start = performance.now();
      const duration = 2000;
      let timeFraction = (elapsed - start) / duration;
      if (timeFraction > 1) timeFraction = 1; // clamp the timeFraction to 0-1 range

      // use Math.abs to make the pulse go from 0 to 1 and back to 0
      const progress = Math.tan(timeFraction * Math.PI);

      sprite.material.opacity = progress;

      sprite.material.needsUpdate = true;
    };

    this.group.add(sprite);
  };

  get tileGroup() {
    return this.group;
  }
}

export const createStateField = (tileSize: number, loop) =>
  new StateField(tileSize, loop, tileData);
