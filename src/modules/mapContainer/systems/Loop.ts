import { Clock, OrthographicCamera } from 'three';

const clock = new Clock();

export class Loop {
  public updatables = [];
  private duration = 500;
  private camera: OrthographicCamera;
  private scene;
  private renderer;
  private labelRenderer;

  constructor() {}

  public init = (camera, scene, renderer, labelRenderer) => {
    this.camera = camera;
    this.scene = scene;
    this.renderer = renderer;
    this.labelRenderer = labelRenderer;
  };

  start() {
    let clockTrack = 0;

    this.renderer.setAnimationLoop(() => {
      const start = performance.now();
      const elapsed = clock.getElapsedTime();
      const timeFraction = (elapsed - start) / this.duration;
      const progress = 0.5 * (1 - Math.cos(timeFraction * Math.PI)) + 0.5;

      if (clockTrack !== Math.floor(progress)) {
        clockTrack = Math.floor(progress);
        this.tick();
      }

      // render a frame
      this.renderer.render(this.scene, this.camera);
      this.labelRenderer.render(this.scene, this.camera);
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

  public setDuration(duration: number) {
    this.duration = duration;
  }
}

export const loop = new Loop();
