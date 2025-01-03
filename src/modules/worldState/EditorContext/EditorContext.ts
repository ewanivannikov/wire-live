import { makeAutoObservable } from "mobx";
import { fields, Fields } from "../../Logic/Base";
import { Loop, loop } from "../../mapContainer/systems/Loop";
import { IState } from "../types";
import { WorldState } from "../viewModel";

export class EditorContext {
  public state: IState;
  constructor(
    private readonly root: WorldState,
    private readonly _loop: Loop,
    private readonly _fields: Fields,
  ) {
    makeAutoObservable(this);
    this.state = this.createState();
    this._loop.setDuration(0);
    this._fields.paused = true;
  }

  private createState() {
    return {
      status: 'editor',
      canBeDrawn: () => true,
      canBeErased: () => true,
      pause: () => {
        console.log('Пауза');
        this._loop.setDuration(0);
        this._fields.paused = true;
      },
      resume: () => {
        console.log('Возобновление');
        this._loop.setDuration(500);
        this._fields.paused = false;
      },
    };
  }
}

export const createEditorContext = (root: WorldState) =>
  new EditorContext(root, loop, fields);
