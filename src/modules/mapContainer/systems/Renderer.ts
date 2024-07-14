import { WebGLRenderer } from "three";

export const createRenderer = (container) => {
  const renderer = new WebGLRenderer({ antialias: true });
  renderer.setSize(container.clientWidth, container.clientHeight);
  renderer.setPixelRatio(window.devicePixelRatio);
  return renderer;
};
