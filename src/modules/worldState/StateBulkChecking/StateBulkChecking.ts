import { LevelContext } from "../Level";
import { StateCompleted } from "../StateCompleted";
import { StateSolving } from "../StateSolving";
import { IState } from "../types";

// Состояние "BulkChecking"
export class StateBulkChecking implements IState {

  constructor(private readonly context: LevelContext) { }

  public handleNext() {
    console.log("В состоянии BulkChecking: Запуск массовой проверки симуляций");
    this.checkMultipleSimulations(true);
  }

  public handlePrev() {
    console.log("Проверка симуляций провалена, возвращение в состояние Solving");
    this.context.setState(new StateSolving(this.context));
  }

  private checkMultipleSimulations(isCompleted: boolean) {
    if (isCompleted) {
      console.log("Все симуляции успешно завершены, переход в состояние Completed");
      this.context.setState(new StateCompleted(this.context));
    } else {
      this.handlePrev();
    }
  }

  public canBeErased = (tile) => {
    return false
  }

  public canBeDrawn = (tile) => {
    return false
  }
}
