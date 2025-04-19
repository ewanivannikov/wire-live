import { Clock, Group, Object3DEventMap, OrthographicCamera } from 'three';
import { CSS2DRenderer } from 'three/examples/jsm/renderers/CSS2DRenderer';

const clock = new Clock();

export class Loop {
  private updatables = [];
  private duration = 500;
  private camera: OrthographicCamera;
  private scene;
  private renderer;
  private labelRenderer: CSS2DRenderer;

  constructor() {}

  public init = (camera, scene, renderer, labelRenderer: CSS2DRenderer) => {
    this.camera = camera;
    this.scene = scene;
    this.renderer = renderer;
    this.labelRenderer = labelRenderer;
  };

  public start() {
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

  public stop() {
    this.renderer.setAnimationLoop(null);
  }

  public tick() {
    // only call the getDelta function once per frame!
    const delta = clock.getDelta();
    const elapsed = clock.getElapsedTime();
    // delta *= 0.1
    for (const object of this.updatables) {
      object.tick(delta, elapsed);
    }
  }

  public addTick = (object: Group<Object3DEventMap>) => {
    
    
    return this.updatables.push(object);
  };

  public clearTick = () => {
    this.updatables = [];
  }

  public setDuration(duration: number) {
    this.duration = duration;
  }
}

export const loop = new Loop();
