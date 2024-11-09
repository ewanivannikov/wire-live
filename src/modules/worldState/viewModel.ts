import { makeAutoObservable } from "mobx";
import { type RouterService, routerService } from "../../shared/services";
import { fields, type Fields } from "../Logic/Base";
import { type Loop } from "../mapContainer/systems";
import { LevelRepository, levelRepository } from "../../data";
import { LevelContext } from "./Level";
import { createStateSolving } from "./StateSolving";

export class WorldState {
  status = 'level.play.solving';
  // tick = this.initTick();
  public isPaused = true;
  mode = 'level';
  modeContext = this.initMode();

  constructor(
    private readonly routerServ: RouterService,
    private readonly logicField: Fields,
    private readonly levelRepo: LevelRepository,
  ) {
    makeAutoObservable(this);
  }

  // private initTick() {
  //   if (this.status === 'level.play.solving') {
  //     this.logicField.paused = true;
  //     return 0
  //   } else {
  //     this.logicField.paused = false;
  //     return 500
  //   }
  // }

  private initMode(): LevelContext {
    if (this.mode === 'level') {
      const context = new LevelContext(this.levelRepo, this.routerServ, this.logicField);
      context.setState(createStateSolving(context));
      return context;
    }
  }

  public switchStatusOnLevelOneChecking() {
    this.modeContext.next();
    this.status = 'level.play.checking.one';
    this.isPaused = false;
    // this.tick = 500;
  }

  public switchStatusOnLevelSolving() {
    this.modeContext.prev();
    this.status = 'level.play.solving';
    // this.tick = 0;
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
