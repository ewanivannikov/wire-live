import { Object3D, Object3DEventMap, Raycaster, Vector2 } from "three";
import { tools } from "../../toolbar/presenter";
import { createBrush } from "../../contextBar/presenter";
import { ToolType } from "../../toolbar";

export const createRaycaster = (container, camera, renderer, tileMap, texture, grid) => {
  const raycaster = new Raycaster();
  let intersects = [];
  let selectedObject: Object3D<Object3DEventMap> = null;
  const pointer = new Vector2();

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
        const brush = createBrush(tools)

        const tool = tools.currentTool === ToolType.Eraser ? ToolType.Eraser : brush.currentBrush;

        selectedObject.material.map = texture.getTileTextures(tool);
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
        if (tools.currentTool === ToolType.Eraser) {
          tileMap.removeTile(res.object);

        } else {
          tileMap.addTile(res.object);
        }

      }
    }
  };

  container.addEventListener('pointermove', onPointerMove);
  container.addEventListener('pointerdown', onPointerDown);

  return raycaster;
}
