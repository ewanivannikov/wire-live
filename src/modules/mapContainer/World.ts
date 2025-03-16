import {
  GridHelper,
  MOUSE,
  TOUCH,
  type Sprite,
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

const tileSize: number = 256;
const gridRowSize: number = 64;

class World {
  private tileMap

  constructor(
    private readonly container: HTMLDivElement,
    private readonly map: object[],
    private readonly _worldState: WorldState
  ) {
    let camera = createCamera(this.container);
    let scene = createScene();
    let renderer = createRenderer(this.container);
    this.container.appendChild(renderer.domElement);
    const labelRenderer = createLabelRenderer(renderer.domElement);
    
    loop.init(camera, scene, renderer, labelRenderer);

    const logicField = fields;

    const size = gridRowSize * tileSize;
    const divisions = tileSize / 4;

    const gridHelper = new GridHelper(size, divisions, 0xa2a2bd, 0xcfcccc);
    gridHelper.rotation.x = Math.PI / 2;
    scene.add(gridHelper);

    const grid = createGrid(tileSize, gridRowSize);
    scene.add(grid.group);

    createTileSet(tile, tileSize).init.then((tileTextures) => {
      const tileMap = createTileMap(
        tileTextures,
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
        const { tileIntersect, gridIntersect, event, previousGridIntersect }: {previousGridIntersect: Sprite, tileIntersect: any, gridIntersect: Sprite, event: PointerEvent} =
          int;
  
        if (tileIntersect && event.pressure > 0 && event.buttons === 1) {
          tileMap.onPointerChange(tileIntersect);
        }
  
        if (gridIntersect) {
          this._worldState.onIntersectCanvas(gridIntersect, event, tileTextures);
        }
  
        // при перемещении мыши в предыдущей клетке остаётся текстура кисти
        // её нужно стирать
        if (previousGridIntersect) {
          const previousOpacity = previousGridIntersect?.material.opacity;
          
          previousGridIntersect.material.map = null;
          // предыдущий ховер задаёт для спрайта 0.4 прозрачность
          if(previousOpacity < 1) {
            previousGridIntersect.material.opacity = 0;
          }
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

      this.tileMap = tileMap
      this._worldState.init(tileMap);
    });
  }

  public dispose = () => {
    this.tileMap.dispose()
  }

  render() {
    // draw animation
    loop.start();
  }
}

export const createWorld = (container: HTMLDivElement, map: object[], worldState: WorldState) => {
  return new World(container, map, worldState);
};
