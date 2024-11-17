import { makeAutoObservable } from "mobx";
import { type RouterService, routerService } from "../../shared/services";
import { fields } from "../Logic/Base";
import { levelRepository } from "../../data";
import { createLevelContext } from "./Level";

export class WorldState {
  public isPaused = true;
  mode = 'level';
  modeContext = createLevelContext(this);
  public state = this.modeContext.state

  constructor(
    private readonly routerServ: RouterService,
  ) {
    makeAutoObservable(this);
  }

  public switchStatusOnLevelOneChecking() {
    this.modeContext.next();
    this.isPaused = false;
  }


  public switchStatusOnLevelSolving() {
    if (this.modeContext.state.status.includes('checking')) {this.modeContext.state.returnToSolving();}
  }

  public get status() {
    return this.state.status
  }

  public get levelId() {
    return this.routerServ.params.levelId;
  }

  public togglePause() {
    if (this.isPaused) {
      this.modeContext.state.resume();
      this.isPaused = false;
    } else {
      this.modeContext.state.pause();
      this.isPaused = true;
    }
  }

  public canBeErased = (tile) => {
    return this.modeContext.state.canBeErased(tile)
  }

  public canBeDrawn = (tile) => {
    return this.modeContext.state.canBeDrawn(tile)
  }
}

export const worldState = new WorldState(routerService, fields, levelRepository);
