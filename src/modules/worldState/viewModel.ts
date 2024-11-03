import { makeAutoObservable } from "mobx";
import { type RouterService, routerService } from "../../shared/services";
import { fields, type Fields } from "../Logic/Base";
import { Loop } from "../mapContainer/systems";
import { LevelRepository, levelRepository } from "../../data";
import { LevelContext } from "./Level";
import { StateSolving } from "./StateSolving";

export class WorldState {
  status = 'level.play.solving';
  tick = this.initTick();
  modeContext = this.initMode();

  constructor(
    private readonly routerServ: RouterService,
    private readonly logicField: Fields,
    private readonly levelRepo: LevelRepository,
  ) {
    makeAutoObservable(this);
  }

  private initTick() {
    if (this.status === 'level.play.solving') {
      this.logicField.paused = true;
      return 0
    } else {
      this.logicField.paused = false;
      return 500
    }
  }

  private initMode(): LevelContext {
    if (this.status.includes('level')) {
      const context = new LevelContext(this.levelRepo, this.routerServ, this.logicField);
      context.setState(new StateSolving(context));
      return context;
    }
  }

  public switchStatusOnLevelOneChecking() {
    this.modeContext.next();
    this.status = 'level.play.checking.one';
    this.tick = 500;
  }

  public switchStatusOnLevelSolving() {
    this.modeContext.prev();
    this.status = 'level.play.solving';
    this.tick = 0;
  }

  public get levelId() {
    return this.routerServ.params.levelId;
  }

  public togglePause(loop: Loop) {
    if (this.tick > 0) {
      this.tick = 0;
      this.logicField.updatePause();
    } else {
      this.tick = 500;
      loop.setDuration(500);
      this.logicField.updatePause();
    }
  }
}

export const worldState = new WorldState(routerService, fields, levelRepository);
