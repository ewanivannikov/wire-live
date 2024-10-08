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
import { OrbitControls } from 'three/addons/controls/OrbitControls';

import { createRenderer } from './systems/Renderer';
import { Loop } from './systems';
import { createGrid } from './Grid';
import { createTileSet } from './TileSet';
import { createTileMap } from './TileMap';
import { createRaycaster } from './systems/Raycaster';

import { fields } from '../Logic/Base';
import { tools, ToolType } from '../toolbar';
import { createBrush } from '../contextBar/presenter';
import { worldState } from '../worldState';

let camera: OrthographicCamera;
let renderer: WebGLRenderer;
let scene: Scene;
let loop: Loop;

const tileSize: number = 256;
const gridRowSize: number = 64;

class World {
  constructor(container: HTMLElement, private readonly mapId: string) {
    camera = createCamera(container);
    scene = createScene();
    renderer = createRenderer(container);
    container.append(renderer.domElement);
    loop = new Loop(camera, scene, renderer);

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
      this.mapId,
    );
    scene.add(tileMap.tileGroup);

    const onIntersectCanvas = createRaycaster(container, camera, renderer, tileMap, grid);

    onIntersectCanvas((int) => {
      const { tileIntersect, gridIntersect, event, previousGridIntersect } = int;

      if (
        tileIntersect
        && event.pressure > 0
        && event.buttons === 1
      ) {
        tileMap.onPointerChange(tileIntersect);
      }
      if (gridIntersect) {
        const brush = createBrush(tools, worldState);

        const tool =
          tools.currentTool === ToolType.Brush
            ? brush.currentBrush
            : ToolType.Eraser;
        if (event.pressure === 0) {
          gridIntersect.material.color.set('#f00');

          gridIntersect.material.map = texture.getTileTextures(tool);
          gridIntersect.material.opacity = 0.4;
          gridIntersect.material.needsUpdate = true;
        }
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
      LEFT: -1,
      MIDDLE: MOUSE.DOLLY,
      RIGHT: MOUSE.PAN,
    };
    controls.touches = {
      ONE: -1,
      TWO: TOUCH.DOLLY_PAN,
    };

    tools.init(loop, logicField, tileMap);
  }

  render() {
    // draw animation
    loop.start();
  }
}

export const createWorld = (container: HTMLElement, mapId) => {
  return new World(container, mapId);
};
