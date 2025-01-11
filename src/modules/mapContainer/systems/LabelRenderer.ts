import { CSS2DRenderer } from 'three/examples/jsm/renderers/CSS2DRenderer';

export const createLabelRenderer = () => {
  // https://waelyasmina.net/articles/how-to-integrate-html-elements-into-a-three-js-scene/
  let labelRenderer = new CSS2DRenderer();
      labelRenderer.setSize( window.innerWidth, window.innerHeight );
      labelRenderer.domElement.style.position = 'absolute';
      labelRenderer.domElement.style.top = '0px';
      labelRenderer.domElement.style.pointerEvents = 'none';
      document.body.appendChild( labelRenderer.domElement );
  return labelRenderer;
};
