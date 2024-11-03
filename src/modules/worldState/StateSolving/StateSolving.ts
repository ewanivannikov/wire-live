import { LevelContext } from "../Level";
import { StateOneChecking } from "../StateOneChecking";
import { State } from "../types";

// Состояние "Solving"
export class StateSolving implements State {

  constructor(private readonly context: LevelContext) { }

  public handleNext() {
    console.log("В состоянии Solving: Рисование и стирание стрелок доступны");
    this.transitionToOneChecking();
  }

  public draw() {
    console.log("Рисование из набора кистей");
  }

  public eraseArrows() {
    console.log("Стирание стрелок");
  }

  private transitionToOneChecking() {
    console.log("Переход в состояние OneChecking");
    this.context.setState(new StateOneChecking(this.context));
  }

  public canBeDeleted = (tile) => {
    const result = this.level.map.find((tileData) => {
      const name = [tileData.x, tileData.y].join(',');
      return name === tile.name
    })

    return !result
  }
}
