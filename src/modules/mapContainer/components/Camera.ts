import { OrthographicCamera } from 'three';

const createCamera = (container) => {
  const camera = new OrthographicCamera();
  camera.near = 1;
  camera.far = 11000;
  camera.position.z = 1;
  camera.left = container.clientWidth / -1;
  camera.right = container.clientWidth / 1;
  camera.top = container.clientHeight / 1;
  camera.bottom = container.clientHeight / -1;
  camera.aspect = container.clientWidth / container.clientHeight;
  camera.updateProjectionMatrix();

  return camera;
}

export { createCamera };
