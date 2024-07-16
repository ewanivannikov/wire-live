import * as THREE from 'three';
import { Loop } from './systems';
import { Fields } from '../Logic/Base';


const hex = {
  Red: 0xff4f00,
  Blue: 0x619eff,
  Yellow: 0xffff11,
  Orange: 0xfaa501,
};

class StateField {

  private group = new THREE.Group();
  // Sparse array to store tile data (tilePosition: Brush.Type.DirectionType)
  cashe = {};

  constructor(
    private readonly tileSize: number,
    private readonly loop: Loop,
    private readonly logicField: Fields,
  ) {
    // this.tileMap = new Map(Object.entries(tileData));

    this.init();
  }

  init = () => {
    this.group.tick = (delta, elapsed) => {

      this.group.children.forEach((sprite) => {
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
    console.log('this.logicField.arrowCache', this.logicField.arrowCache);
    this.logicField.arrowCache.forEach((arrow) => {
      const [x, y] = arrow.position.vector;
      const color = arrow.state;

      this.addSprite(x, y, color);
    });

    this.loop.addTick(this.group);



  };

  // initCashe = (tileData) => {
  //   this.cashe = new Map(
  //     Object.entries(
  //       tileData.reduce((acc, cur) => {
  //         const { tileId, x, y } = cur;
  //         return { ...acc, [`${x},${y}`]: tileId };
  //       }, {}),
  //     ),
  //   );
  //   return this.cashe;
  // };

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

    this.group.add(sprite);
  };

  get tileGroup() {
    return this.group;
  }
}

export const createStateField = (tileSize: number, loop, logicField) =>
  new StateField(tileSize, loop, logicField);
