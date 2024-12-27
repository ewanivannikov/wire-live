import { makeAutoObservable } from 'mobx';
import { LevelContext } from '../Level';
import { createStateOneChecking } from '../StateOneChecking';
import { IState } from '../types';
import { type Loop, loop as loopInstance } from '../../mapContainer/systems';

// Состояние "Solving"
export class StateSolving implements IState {
  public status = 'level.play.solving';

  constructor(
    private readonly context: LevelContext,
    private readonly loop: Loop,
  ) {
    makeAutoObservable(this);

    this.loop.setDuration(0);
    this.context.logicField.paused = true;
  }

  public handleNext() {
    console.log('Переход на one checking');
    this.context.setState(createStateOneChecking(this.context));
  }

  public draw() {
    console.log('Рисование из набора кистей');
  }

  public eraseArrows() {
    console.log('Стирание стрелок');
  }

  public canBeErased = (tile) => {
    const result = this.context.level.map.find((tileData) => {
      const name = [tileData.x, tileData.y].join(',');
      return name === tile.name;
    });
    return !result;
  };

  public canBeDrawn = (tile) => {
    const result = this.context.level.map.find((tileData) => {
      const name = [tileData.x, tileData.y].join(',');
      return name === tile.name;
    });
    return !result;
  };
}

export const createStateSolving = (context: LevelContext) => {
  return new StateSolving(context, loopInstance);
};
