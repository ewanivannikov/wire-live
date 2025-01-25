import { CSS2DRenderer } from 'three/examples/jsm/renderers/CSS2DRenderer';

export const createLabelRenderer = (container) => {
  // https://waelyasmina.net/articles/how-to-integrate-html-elements-into-a-three-js-scene/
  const labelRenderer = new CSS2DRenderer();
      labelRenderer.setSize(container.clientWidth, container.clientHeight);
      labelRenderer.domElement.style.position = 'absolute';
      labelRenderer.domElement.style.top = '0px';
      labelRenderer.domElement.style.pointerEvents = 'none';
      labelRenderer.domElement.id = 'labelContainer';
      document.body.appendChild( labelRenderer.domElement );
  return labelRenderer;
};
