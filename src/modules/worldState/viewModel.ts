import { makeAutoObservable } from "mobx";
import { type RouterService, routerService } from "../../shared/services";
import { fields, type Fields } from "../Logic/Base";
import { Loop } from "../mapContainer/systems";
import { LevelRepository, levelRepository } from "../../data";
// import { Position } from "../Logic/Position";
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
      return new LevelContext(new StateSolving(this.modeContext), this.levelRepo, this.routerServ, this.logicField);
    }
  }

  public switchStatusOnLevelOneChecking() {
    this.status = 'level.play.checking.one';
  }



  public switchStatusOnLevelSolving() {
    this.status = 'level.play.solving';
    this.logicField.clearStates();
    this.logicField.clearSignals();
    this.logicField.clearArrowsStates();
  }

  public switchOnSend() {
    this.switchStatusOnLevelOneChecking();
    // this.initRequisites()
    this.logicField.paused = false;
    this.tick = 500;
  }

  public switchOnSolve() {
    this.switchStatusOnLevelSolving();
    this.logicField.paused = true;
    this.tick = 0;
  }

  public get levelId() {
    return this.routerServ.params.levelId;
  }

  public get level() {
    return this.levelRepo.getLevelById(this.levelId);
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
