import * as THREE from 'three';

export class Grid {
  gridRowSize = 4;
  tileGroup: THREE.Group<THREE.Object3DEventMap>;

  constructor(
    private readonly tileSize = 256,
    gridRowSize: number,
  ) {
    this.gridRowSize = gridRowSize;
    this.init();
  }

  init = () => {
    const tileGroup = new THREE.Group();
    const gridSize = this.gridRowSize;

    for (let index = 0; index < gridSize * gridSize; index++) {
      const tile = this.createTile(index);
      tileGroup.add(tile);
      this.tileGroup = tileGroup;
    }
  };

  createTile = (index: number) => {
    const material = new THREE.SpriteMaterial({
      color: '#69f',
      opacity: 0,
      blending: THREE.CustomBlending,
      blendEquation: THREE.AddEquation,
      blendSrc: THREE.SrcAlphaFactor,
      blendDst: THREE.OneMinusSrcAlphaFactor,
    });
    const sprite = new THREE.Sprite(material);
    const { x, y } = this.getPositionFromIndex(index);
    sprite.position.set(x, y, 0);
    sprite.scale.set(this.tileSize, this.tileSize, 0);
    sprite.name = this.getKeyFromIndex(index);
    return sprite;
  };

  getPositionFromIndex = (index: number) => {
    const SHTOTO = 0.5 - this.gridRowSize / 2;
    return {
      x: this.tileSize * (SHTOTO + (index % this.gridRowSize)),
      y: -this.tileSize * (SHTOTO + Math.floor(index / this.gridRowSize)),
    };
  };

  getKeyFromIndex = (index: number) => {
    const SHTOTO = this.gridRowSize / 2;
    return `${-SHTOTO + (index % this.gridRowSize)},${-SHTOTO + Math.floor(index / this.gridRowSize)}`;
  };

  get group() {
    return this.tileGroup;
  }
}

export const createGrid = (tileSize: number, gridSize: number) => new Grid(tileSize, gridSize);
