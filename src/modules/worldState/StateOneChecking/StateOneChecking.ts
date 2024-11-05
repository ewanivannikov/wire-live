import { makeAutoObservable } from "mobx";
import { LevelContext } from "../Level";
import { StateBulkChecking } from "../StateBulkChecking";
import { StateSolving } from "../StateSolving";
import { IState } from "../types";

// Состояние "OneChecking"
export class StateOneChecking implements IState {
  public isSolved = false;

  constructor(private readonly context: LevelContext) {
    makeAutoObservable(this);
    this.context.checkSolution().then(() => {
      console.log("Output валиден, переход в состояние BulkChecking");
      this.isSolved = true;
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

  // public pause() {
  //   console.log("Пауза");
  // }

  // public resume() {
  //   console.log("Возобновление");
  // }

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
