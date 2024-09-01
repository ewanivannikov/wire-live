import { Object3D, Object3DEventMap, OrthographicCamera, Raycaster, Vector2, WebGLRenderer } from 'three';
import { tools } from '../../toolbar/presenter';
import { createBrush } from '../../contextBar/presenter';
import { ToolType } from '../../toolbar';

export const createRaycaster = (
  container: HTMLElement,
  camera: OrthographicCamera,
  renderer: WebGLRenderer,
  tileMap,
  texture,
  grid,
) => {
  const raycaster = new Raycaster();
  let intersects = [];
  let selectedObject: Object3D<Object3DEventMap> = null;
  const pointer = new Vector2();

  const onPointerMove = (event: PointerEvent) => {
    if (selectedObject) {
      selectedObject.material.color.set('#69f');
      selectedObject.material.map = null;
      selectedObject.material.opacity = 0;
      selectedObject.material.needsUpdate = true;
      selectedObject = null;
    }

    const brush = createBrush(tools);

    const tool =
      tools.currentTool === ToolType.Brush
        ? brush.currentBrush
        : ToolType.Eraser;

    // calculate pointer position in normalized device coordinates
    // (-1 to +1) for both components
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
      const tileIntersect = intersects
        .filter((res) => {
          return res && res.object;
        })
        .at(-1);

      const gridIntersect = intersects
        .filter((res) => {
          return res && res.object;
        })
        .at(0);

      if (gridIntersect?.object) {
        if (event.pressure === 0) {
          selectedObject = gridIntersect.object;
          selectedObject.material.color.set('#f00');

          selectedObject.material.map = texture.getTileTextures(tool);
          selectedObject.material.opacity = 0.4;
          selectedObject.material.needsUpdate = true;
        }
      }

      if (tileIntersect?.object && event.pressure > 0 && event.buttons === 1) {
        tileMap.onPointerChange(tileIntersect.object);
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
      const topIntersect = intersects
        .filter((res) => {
          return res?.object;
        })
        .at(-1);

      if (topIntersect?.object && event.buttons === 1) {
        tileMap.onPointerChange(topIntersect.object);
      }
    }
  };

  container.addEventListener('pointermove', onPointerMove);
  container.addEventListener('pointerdown', onPointerDown);

  return raycaster;
};
