import { makeAutoObservable, runInAction } from 'mobx';
import { LevelContext } from '../Level';
import { createStateBulkChecking } from '../StateBulkChecking';
import { createStateSolving } from '../StateSolving';
import { IState } from '../types';
import { type Loop, loop as loopInstance } from '../../mapContainer/systems';
import { emitter } from '../../../shared/services/EventEmitterService';
import { solutionChecked } from '../../Logic/Base';

// Состояние "OneChecking"
export class StateOneChecking implements IState {
  public isSolved = false;
  public status = 'level.play.checking.one';

  constructor(
    private readonly context: LevelContext,
    private readonly loop: Loop,
  ) {
    makeAutoObservable(this);
    this.runSimulation();
  }

  public handleNext() {
    console.log(
      'В состоянии OneChecking: Запуск единичной проверки симуляции и валидации',
    );
  }

  public handlePrev() {
    console.log('В состоянии OneChecking: Возвращение в состояние Solving');
    this.returnToSolving();
  }

  public pause() {
    console.log('Пауза');
    this.loop.setDuration(0);
    this.context.logicField.paused = true;
  }

  public resume() {
    console.log('Возобновление');
    this.loop.setDuration(500);
    this.context.logicField.paused = false;
  }

  private runSimulation = () => {
    this.loop.setDuration(500);
    this.context.logicField.paused = false;

    const requisiteIndex = this.context.initRequisites();

    emitter.once(solutionChecked).then((data) => {
      if (data === 'resolved') {
        console.log('Output валиден, переход в состояние BulkChecking');
        runInAction(() => {
          this.isSolved = true;
        });
        this.context.setState(
          createStateBulkChecking(this.context, requisiteIndex),
        );
      }
      if (data === 'rejected') {
        console.log('Output не валиден, возвращение в состояние Solving');
        this.returnToSolving();
      }
    });
  };

  public returnToSolving = () => {
    this.context.logicField.clearStates();
    this.context.logicField.clearSignals();
    this.context.logicField.clearArrowsStates();
    this.context.logicField.clearPatternArrows();
    this.context.setState(createStateSolving(this.context));
  };

  public canBeErased = () => {
    return false;
  };

  public canBeDrawn = () => {
    return false;
  };
}

export const createStateOneChecking = (context: LevelContext) => {
  return new StateOneChecking(context, loopInstance);
};
