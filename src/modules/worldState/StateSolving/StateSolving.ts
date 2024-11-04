import { LevelContext } from "../Level";
import { StateOneChecking } from "../StateOneChecking";
import { IState } from "../types";

// Состояние "Solving"
export class StateSolving implements IState {

  constructor(private readonly context: LevelContext) { }

  public handleNext() {
    console.log('Переход на one checking');
    this.context.setState(new StateOneChecking(this.context));
    this.context.initRequisites()
    this.context.logicField.paused = false;
  }

  public draw() {
    console.log("Рисование из набора кистей");
  }

  public eraseArrows() {
    console.log("Стирание стрелок");
  }

  public canBeErased = (tile) => {
    const result = this.context.level.map.find((tileData) => {
      const name = [tileData.x, tileData.y].join(',');
      return name === tile.name
    })
    return !result
  }

  public canBeDrawn = (tile) => {
    const result = this.context.level.map.find((tileData) => {
      const name = [tileData.x, tileData.y].join(',');
      return name === tile.name
    })
    return !result
  }
}
