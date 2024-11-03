import { LevelContext } from "../Level";
import { State } from "../types";

// Состояние "Completed"
export class StateCompleted implements State {
  constructor(private readonly context: LevelContext) { }

  public handleNext() {
    console.log("В состоянии Completed: Уровень успешно завершён!");
    this.celebrate();
  }

  public celebrate() {
    console.log("Наслаждение победой!");
    this.saveProgress();
    this.showCompletionScreen();
  }

  private saveProgress() {
    console.log("Сохранение данных прохождения на сервере");
  }

  private showCompletionScreen() {
    console.log("Показ экрана успешного завершения");
  }
}
