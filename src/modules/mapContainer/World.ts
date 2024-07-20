import {
  GridHelper,
  MOUSE,
  OrthographicCamera,
  Scene,
  WebGLRenderer,
} from 'three';
import { createCamera } from './components/Camera';
import { createScene } from './components/Scene';
import tile from '../../assets/atlas.png';
import { OrbitControls } from 'three/addons/controls/OrbitControls';

import { createRenderer } from './systems/Renderer';
import { Loop } from './systems';
import { createGrid } from './Grid';
import { createTileSet } from './TileSet';
import { createTileMap } from './TileMap';
import { createRaycaster } from './systems/Raycaster';

import { createFields } from '../Logic/Base';

let camera: OrthographicCamera;
let renderer: WebGLRenderer;
let scene: Scene;
let loop: Loop;

const tileSize: number = 256;
const gridRowSize: number = 64;

class World {
  constructor(container) {
    camera = createCamera(container);
    scene = createScene();
    renderer = createRenderer(container);
    container.append(renderer.domElement);
    loop = new Loop(camera, scene, renderer);

    const logicField = createFields();

    const size = gridRowSize * tileSize;
    const divisions = tileSize / 4;

    const gridHelper = new GridHelper(size, divisions, 0x0000ff, 0x808080);
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
      grid
    );
    scene.add(tileMap.tileGroup);

    createRaycaster(container, camera, renderer, tileMap, texture, grid);

    const controls = new OrbitControls(camera, renderer.domElement);
    controls.minZoom = 0.2;
    controls.maxZoom = 1;
    controls.update(); // NOTE This will place the camera at the default distance
    controls.mouseButtons = {
      LEFT: -1,
      MIDDLE: MOUSE.DOLLY,
      RIGHT: MOUSE.PAN,
    };
  }

  render() {
    // draw animation
    loop.start();
  }
}

export const createWorld = (container) => {
  return new World(container);
};
