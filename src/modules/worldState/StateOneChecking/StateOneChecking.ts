import { makeAutoObservable } from "mobx";
import { LevelContext } from "../Level";
import { StateBulkChecking } from "../StateBulkChecking";
import { StateSolving } from "../StateSolving";
import { IState } from "../types";

// Состояние "OneChecking"
export class StateOneChecking implements IState {

  constructor(private readonly context: LevelContext) {
    makeAutoObservable(this);
  }

  public handleNext() {
    console.log("В состоянии OneChecking: Запуск единичной проверки симуляции и валидации");
    this.validateSingleOutput(true);
  }

  public handlePrev() {
    console.log("В состоянии OneChecking: Возвращение в состояние Solving");
    this.returnToSolving();
  }

  public pause() {
    console.log("Пауза");
  }

  public resume() {
    console.log("Возобновление");
  }

  public get isSolved() {
    const outputArrowListLength = this.context.outputArrowList.list.length
  }

  public returnToSolving() {
    console.log("Возвращение в состояние solving");
    this.context.logicField.clearStates();
    this.context.logicField.clearSignals();
    this.context.logicField.clearArrowsStates();
    this.context.logicField.paused = true;
    this.context.setState(new StateSolving(this.context));
  }

  private validateSingleOutput(isValid: boolean) {
    if (isValid) {
      console.log("Output валиден, переход в состояние BulkChecking");
      this.context.setState(new StateBulkChecking(this.context));
    } else {
      console.log("Output не валиден, возвращение в состояние Solving");
      this.returnToSolving();
    }
  }

  public canBeErased = (tile) => {
    return false
  }

  public canBeDrawn = (tile) => {
    return false
  }
}
