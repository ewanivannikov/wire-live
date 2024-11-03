import { LevelContext } from "../Level";
import { StateCompleted } from "../StateCompleted";
import { StateSolving } from "../StateSolving";
import { State } from "../types";

// Состояние "BulkChecking"
export class StateBulkChecking implements State {

  constructor(private readonly context: LevelContext) { }

  public handleNext() {
    console.log("В состоянии BulkChecking: Запуск массовой проверки симуляций");
    this.checkMultipleSimulations(true);
  }

  private checkMultipleSimulations(isCompleted: boolean) {
    if (isCompleted) {
      console.log("Все симуляции успешно завершены, переход в состояние Completed");
      this.context.setState(new StateCompleted(this.context));
    } else {
      console.log("Проверка симуляций провалена, возвращение в состояние Solving");
      this.context.setState(new StateSolving(this.context));
    }
  }
}
