import * as THREE from 'three';
import { GUI } from 'dat.gui';

const size = {
  width: 256,
  height: 256,
};

export const viewTile = (texture) => {
  if (!texture.isTexture) {
    console.error(`❌ is not texture ${texture}`);
    return;
  }
  const scene = new THREE.Scene();
  const tileGroup = new THREE.Group();
  // scene.background = new THREE.Color(0xffffff);
  const camera = new THREE.PerspectiveCamera(50, 1, 1, 1000);
  camera.position.setZ(1);
  // camera.lookAt( scene.position );

  const renderer = new THREE.WebGLRenderer({ antialias: true });
  renderer.setSize(size.width, size.height);
  document.body.appendChild(renderer.domElement);

  const material = new THREE.SpriteMaterial({
    map: texture,
    transparent: true,
    // depthWrite: false
  });

  const sprite = new THREE.Sprite(material);
  tileGroup.add(sprite);

  // Add the mesh to the scene
  scene.add(tileGroup);
  // camera.updateProjectionMatrix();
  // Render the scene

  const gui = new GUI();
  const textureFolder = gui.addFolder('Texture');
  textureFolder.add(texture, 'rotation', 0, Math.PI * 2).step(Math.PI / 2);
  // textureFolder.add(texture.center, 'x', 0, 1).step(1/7)
  // textureFolder.add(texture.center, 'y', -1, 0).step(1/7)
  textureFolder.add(texture.offset, 'x', 0, 1).step(1 / 8); // [0, 0.875]
  textureFolder.add(texture.offset, 'y', -1, 0).step(1 / 8); // [-0.25, 0]
  textureFolder.open();
  // Xcen: 0.0625(1/16), Ycen: 0.9375(15/16),

  renderer.render(scene, camera);
};
