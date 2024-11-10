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
import { tools, ToolType } from '../toolbar';
import { brush } from '../contextBar/presenter';
import { worldState } from '../worldState';

let camera: OrthographicCamera;
let renderer: WebGLRenderer;
let scene: Scene;
// let loop: Loop;

const tileSize: number = 256;
const gridRowSize: number = 64;

class World {
  constructor(
    private readonly container: HTMLDivElement,
    private readonly mapId: string
  ) {
    camera = createCamera(container);
    scene = createScene();
    renderer = createRenderer(container);
    container.appendChild(renderer.domElement);
    loop.init(camera, scene, renderer);

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

        const tool =
          tools.currentTool === ToolType.Brush
            ? brush.currentBrush
            : ToolType.Eraser;
        const canBeDrawn = worldState.canBeDrawn(gridIntersect);
        const canBeErased = worldState.canBeErased(gridIntersect);

        if (event.pressure === 0 && (canBeDrawn || canBeErased)) {
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
      LEFT: null,
      MIDDLE: MOUSE.DOLLY,
      RIGHT: MOUSE.PAN,
    };
    controls.touches = {
      ONE: null,
      TWO: TOUCH.DOLLY_PAN,
    };

    tools.init(loop, logicField, tileMap);
  }

  render() {
    // draw animation
    loop.start();
  }
}

export const createWorld = (container: HTMLDivElement, mapId: string) => {
  return new World(container, mapId);
};
