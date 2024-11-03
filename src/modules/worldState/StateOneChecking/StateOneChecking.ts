import { LevelContext } from "../Level";
import { StateBulkChecking } from "../StateBulkChecking";
import { StateSolving } from "../StateSolving";
import { State } from "../types";

// Состояние "OneChecking"
export class StateOneChecking implements State {

  constructor(private readonly context: LevelContext) { }

  public handleNext() {
    console.log("В состоянии OneChecking: Запуск единичной проверки симуляции и валидации");
    this.validateSingleOutput(true);
  }

  public pause() {
    console.log("Пауза");
  }

  public resume() {
    console.log("Возобновление");
  }

  public returnToSolving() {
    console.log("Возвращение в состояние Solving");
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
}
