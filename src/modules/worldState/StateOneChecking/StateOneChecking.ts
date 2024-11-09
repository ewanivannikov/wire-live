import { makeAutoObservable, runInAction } from "mobx";
import { LevelContext } from "../Level";
import { StateBulkChecking } from "../StateBulkChecking";
import { StateSolving } from "../StateSolving";
import { IState } from "../types";
import { type Loop, loop as loopInstance } from "../../mapContainer/systems";

// Состояние "OneChecking"
export class StateOneChecking implements IState {
  public isSolved = false;
  public status = 'level.play.checking.one';

  constructor(private readonly context: LevelContext, private readonly loop: Loop) {
    makeAutoObservable(this);
    this.loop.setDuration(500);
    this.context.logicField.paused = false;
    this.context.checkSolution().then(() => {
      console.log("Output валиден, переход в состояние BulkChecking");

      runInAction(() => { this.isSolved = true });

      this.context.setState(new StateBulkChecking(this.context));
    }).catch(() => {
      console.log("Output не валиден, возвращение в состояние Solving");
      this.returnToSolving();
    });
  }

  public handleNext() {
    console.log("В состоянии OneChecking: Запуск единичной проверки симуляции и валидации");
  }

  public handlePrev() {
    console.log("В состоянии OneChecking: Возвращение в состояние Solving");
    this.returnToSolving();
  }

  public pause() {
    console.log("Пауза");
    this.loop.setDuration(0);
    this.context.logicField.paused = true;
  }

  public resume() {
    console.log("Возобновление");
    this.loop.setDuration(500);
    this.context.logicField.paused = false;
  }

  public returnToSolving() {
    console.log("Возвращение в состояние solving");
    this.context.logicField.clearStates();
    this.context.logicField.clearSignals();
    this.context.logicField.clearArrowsStates();
    this.context.logicField.paused = true;
    this.context.setState(new StateSolving(this.context));
  }

  public canBeErased = (tile) => {
    return false
  }

  public canBeDrawn = (tile) => {
    return false
  }
}

export const createStateOneChecking = (context: LevelContext) => {
  return new StateOneChecking(context, loopInstance);
}
