import {
  GridHelper,
  MOUSE,
  OrthographicCamera,
  Scene,
  TOUCH,
  WebGLRenderer,
} from 'three';
import { createCamera } from './components/Camera';
import { createScene } from './components/Scene';
import tile from '../../assets/atlas.png';
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls';

import { createRenderer } from './systems/Renderer';
import { loop } from './systems';
import { createGrid } from './Grid';
import { createTileSet } from './TileSet';
import { createTileMap } from './TileMap';
import { createRaycaster } from './systems/Raycaster';

import { fields } from '../Logic/Base';
import { WorldState } from '../worldState';
import { createLabelRenderer } from './systems/LabelRenderer';

let camera: OrthographicCamera;
let renderer: WebGLRenderer;
let scene: Scene;
// let loop: Loop;

const tileSize: number = 256;
const gridRowSize: number = 64;

class World {
  constructor(
    private readonly container: HTMLDivElement,
    private readonly map: object[],
    private readonly _worldState: WorldState
  ) {
    camera = createCamera(container);
    scene = createScene();
    renderer = createRenderer(container);
    container.appendChild(renderer.domElement);
    const labelRenderer = createLabelRenderer();
    
    loop.init(camera, scene, renderer, labelRenderer);

    const logicField = fields;

    const size = gridRowSize * tileSize;
    const divisions = tileSize / 4;

    const gridHelper = new GridHelper(size, divisions, 0xa2a2bd, 0xcfcccc);
    gridHelper.rotation.x = Math.PI / 2;
    scene.add(gridHelper);

    const grid = createGrid(tileSize, gridRowSize);
    scene.add(grid.group);

    const texture = createTileSet(tile, tileSize);
    const tileMap = createTileMap(
      texture.tileTextures,
      tileSize,
      loop,
      logicField,
      grid,
      this.map,
      this._worldState
    );
    scene.add(tileMap.tileGroup);

    const onIntersectCanvas = createRaycaster(
      container,
      camera,
      renderer,
      tileMap,
      grid,
    );

    onIntersectCanvas((int) => {
      const { tileIntersect, gridIntersect, event, previousGridIntersect } =
        int;

      if (tileIntersect && event.pressure > 0 && event.buttons === 1) {
        tileMap.onPointerChange(tileIntersect);
      }

      if (gridIntersect) {
        this._worldState.onIntersectCanvas(gridIntersect, event, texture);
      }

      if (previousGridIntersect) {
        previousGridIntersect.material.color.set('#69f');
        previousGridIntersect.material.map = null;
        previousGridIntersect.material.opacity = 0;
        previousGridIntersect.material.needsUpdate = true;
      }
    });

    const controls = new OrbitControls(camera, renderer.domElement);
    controls.minZoom = 0.2;
    controls.maxZoom = 1;
    controls.update(); // NOTE This will place the camera at the default distance
    controls.mouseButtons = {
      LEFT: null,
      MIDDLE: MOUSE.DOLLY,
      RIGHT: MOUSE.PAN,
    };
    controls.touches = {
      ONE: null,
      TWO: TOUCH.DOLLY_PAN,
    };

    this._worldState.init(loop, tileMap);
  }

  render() {
    // draw animation
    loop.start();
  }
}

export const createWorld = (container: HTMLDivElement, map: object[], worldState: WorldState) => {
  return new World(container, map, worldState);
};
