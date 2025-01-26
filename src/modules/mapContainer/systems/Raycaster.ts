import {
  Object3D,
  Object3DEventMap,
  OrthographicCamera,
  Raycaster,
  Vector2,
  WebGLRenderer,
} from 'three';

export const createRaycaster = (
  container: HTMLElement,
  camera: OrthographicCamera,
  renderer: WebGLRenderer,
  tileMap,
  grid,
) => {
  const raycaster = new Raycaster();
  let intersects = [];
  const pointer = new Vector2();

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

  container.addEventListener('pointerdown', onPointerDown);

  // https://web.dev/articles/streams
  const stream = new ReadableStream({
    start(controller) {
      container.addEventListener('pointermove', (event) =>
        controller.enqueue(event),
      );
    },
  });

  const intersectStream = () => {
    const ptr = new Vector2();
    let itrsts = [];
    let gridIntersectName = '';
    let previousGridIntersect: Object3D<Object3DEventMap> = null;
    
    return new TransformStream({
      transform(event, controller) {
        // calculate pointer position in normalized device coordinates
        // (-1 to +1) for both components
        const rect = renderer.domElement.getBoundingClientRect();
        ptr.x =
          ((event.clientX - rect.left) / (rect.right - rect.left)) * 2 - 1;
        ptr.y =
          -((event.clientY - rect.top) / (rect.bottom - rect.top)) * 2 + 1;

        raycaster.setFromCamera(ptr, camera);
        itrsts = raycaster.intersectObjects(
          [grid.group, tileMap.tileGroup],
          true,
        );
        if (itrsts.length > 0) {
          const tileIntersect = itrsts
            .filter((res) => {
              return res && res.object;
            })
            .at(-1);

          const gridIntersect = itrsts
            .filter((res) => {
              return res && res.object;
            })
            .at(0);

          if (gridIntersectName !== gridIntersect?.object.name) {
            controller.enqueue({
              previousGridIntersect,
              tileIntersect: tileIntersect?.object,
              gridIntersect: gridIntersect?.object,
              event,
            });
            gridIntersectName = gridIntersect?.object.name;
            previousGridIntersect = gridIntersect?.object;
          }
        }
      },
    });
  };

  const onIntersectCanvas = (handler: (event) => void) => {
    stream.pipeThrough(intersectStream()).pipeTo(
      new WritableStream({
        write(event) {
          handler(event);
        },
      }),
    );
  };

  return onIntersectCanvas;
};
