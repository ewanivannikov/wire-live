import { Clock } from 'three';

const clock = new Clock();

class Loop {
  public updatables = [];

  constructor(camera, scene, renderer) {
    this.camera = camera;
    this.scene = scene;
    this.renderer = renderer;
  }

  start() {
    this.renderer.setAnimationLoop(() => {
      // tell every animated object to tick forward one frame
      this.tick();
      // render a frame
      this.renderer.render(this.scene, this.camera);
    });
  }

  stop() {
    this.renderer.setAnimationLoop(null);
  }

  tick() {
    // only call the getDelta function once per frame!
    const delta = clock.getDelta();
    const elapsed = clock.getElapsedTime();
    // delta *= 0.1
    for (const object of this.updatables) {
      object.tick(delta, elapsed);
    }
  }

  addTick = (object) => {
    return this.updatables.push(object);
  };
}

export { Loop };
