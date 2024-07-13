import * as THREE from 'three';
import tile from '../../assets/atlas.png';
// import tile from '../../assets/uv_grid_opengl.jpg';
import { createTileSet } from './TileSet';
import { createTileMap } from './TileMap';
import { OrbitControls } from 'three/addons/controls/OrbitControls.js';
import { createGrid } from './Grid';
import { createTools } from './Tools';
import { createStateField } from './StateField';
import { Loop } from './systems/Loop';

export const tools = createTools();
let loop;

export const init = (element) => {
  // Set up scene, camera, and renderer
  const scene = new THREE.Scene();
  scene.background = new THREE.Color(0xffffff); // Set the background color to white

  // const camera = new THREE.PerspectiveCamera( 50, aspect, 1, 11000 );
  const camera = new THREE.OrthographicCamera();
  camera.near = 1;
  camera.far = 11000;
  camera.position.z = 1;
  camera.updateProjectionMatrix();

  const renderer = new THREE.WebGLRenderer({ antialias: true });

  loop = new Loop(camera, scene, renderer);

  const tileSize = 256;
  const gridRowSize = 64;

  const grid = createGrid(tileSize, gridRowSize, tools);
  scene.add(grid.group);

  const stateField = createStateField(tileSize, loop);
  scene.add(stateField.tileGroup);

  const texture = createTileSet(tile, tileSize);
  const tileMap = createTileMap(texture.tileTextures, tileSize, tools);
  scene.add(tileMap.tileGroup);

  const size = gridRowSize * tileSize;
  const divisions = tileSize / 4;

  const gridHelper = new THREE.GridHelper(size, divisions, 0x0000ff, 0x808080);
  gridHelper.rotation.x = Math.PI / 2;
  scene.add(gridHelper);

  const controls = new OrbitControls(camera, renderer.domElement);
  controls.minZoom = 0.2;
  controls.maxZoom = 1;
  controls.update(); // NOTE This will place the camera at the default distance
  controls.mouseButtons = {
    LEFT: THREE.MOUSE.PAN,
    MIDDLE: THREE.MOUSE.DOLLY,
    RIGHT: THREE.MOUSE.PAN,
  };

  camera.left = element.clientWidth / -1;
  camera.right = element.clientWidth / 1;
  camera.top = element.clientHeight / 1;
  camera.bottom = element.clientHeight / -1;
  camera.aspect = element.clientWidth / element.clientHeight;
  camera.updateProjectionMatrix();

  renderer.setSize(element.clientWidth, element.clientHeight);
  renderer.setPixelRatio(window.devicePixelRatio);

  element.appendChild(renderer.domElement);

  const onWindowResize = () => {
    camera.aspect = window.innerWidth / window.innerHeight;
    camera.updateProjectionMatrix();

    renderer.setSize(window.innerWidth, window.innerHeight);
  };

  const raycaster = new THREE.Raycaster();
  let intersects = [];
  let selectedObject = null;
  const pointer = new THREE.Vector2();

  function onPointerMove(event) {
    if (selectedObject) {
      selectedObject.material.color.set('#69f');
      selectedObject.material.map = null;
      selectedObject.material.opacity = 0;
      selectedObject.material.needsUpdate = true;
      selectedObject = null;
    }

    // calculate pointer position in normalized device coordinates
    // (-1 to +1) for both components
    const rect = renderer.domElement.getBoundingClientRect();
    pointer.x =
      ((event.clientX - rect.left) / (rect.right - rect.left)) * 2 - 1;
    pointer.y =
      -((event.clientY - rect.top) / (rect.bottom - rect.top)) * 2 + 1;

    raycaster.setFromCamera(pointer, camera);
    intersects = raycaster.intersectObject(grid.group, true);
    if (intersects.length > 0) {
      const res = intersects.filter(function (res) {
        return res && res.object;
      })[0];

      if (res && res.object) {
        selectedObject = res.object;
        selectedObject.material.color.set('#f00');
        selectedObject.material.map = texture.getTileTextures(
          tools.currentTool,
        );
        selectedObject.material.opacity = 0.4;
        selectedObject.material.needsUpdate = true;
      }
    }
  }

  const onPointerDown = (event) => {
    const rect = renderer.domElement.getBoundingClientRect();
    pointer.x =
      ((event.clientX - rect.left) / (rect.right - rect.left)) * 2 - 1;
    pointer.y =
      -((event.clientY - rect.top) / (rect.bottom - rect.top)) * 2 + 1;

    raycaster.setFromCamera(pointer, camera);
    intersects = raycaster.intersectObjects(
      [grid.group, tileMap.tileGroup],
      true,
    );
    if (intersects.length > 0) {
      const res = intersects
        .filter((res) => {
          return res && res.object;
        })
        .at(-1);

      if (res && res.object) {
        if (tools.currentTool === 'Eraser') {
          tileMap.removeTile(res.object);
          return;
        }
        tileMap.addTile(res.object);
      }
    }
  };

  element.addEventListener('pointermove', onPointerMove);
  element.addEventListener('pointerdown', onPointerDown);
  element.addEventListener('resize', onWindowResize, false);

  // Render the scene
  // function render() {
  //   requestAnimationFrame(render);
  //   renderer.render(scene, camera);
  // }

  // render();
  loop.start();
};
