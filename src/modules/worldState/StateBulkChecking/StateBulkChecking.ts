import { LevelContext } from '../Level';
import { createStateSolving } from '../StateSolving';
import { IState } from '../types';
import { type Loop, loop as loopInstance } from '../../mapContainer/systems';
import { emitter } from '../../../shared/services/EventEmitterService';
import { makeAutoObservable, runInAction } from 'mobx';
import { fields, Fields, solutionChecked } from '../../Logic/Base';
import { LevelRepository, levelRepository } from '../../../data/repositories/LevelRepository';
import { SolutionRepository, solutionRepository } from '../../../data/repositories/SolutionRepository/SolutionRepository';
import { RouterService, routerService } from '../../../shared/services/RouterService';


// Состояние "BulkChecking"
export class StateBulkChecking implements IState {
  public status = 'level.checking.bulk';
  private _exceptions: number[] = [];
  private countSimulations = 1;


  constructor(
    private readonly context: LevelContext,
    private readonly _requisiteIndex: number,
    private readonly loop: Loop,
    private readonly _solutionRepo: SolutionRepository,
    private readonly _routerServ: RouterService,
    private readonly _fields: Fields,
  ) {
    makeAutoObservable(this);
    
    this.exceptions = this._requisiteIndex;
    this.context.setStatusCompleted('pending');
    this.runAllSimulations();
  }

  public handleNext() {
    console.log('В состоянии BulkChecking: Запуск массовой проверки симуляций');
    this.checkMultipleSimulations(true);
  }

  public handlePrev() {
    console.log(
      'Проверка симуляций провалена, возвращение в состояние Solving',
    );
    this.context.setState(createStateSolving(this.context));
  }

  private runAllSimulations = () => {
    this.loop.setDuration(10);
    this.context.logicField.paused = false;
    const requisiteIndex = this.context.initRequisites(this._exceptions);
    if (
      requisiteIndex instanceof Error &&
      requisiteIndex.cause === 'ALL_ARE_EXCEPTIONS'
    ) {
      console.info('MOLODETS');
      this.pause();
      this.context.setStatusCompleted('completed');
      this.setCountSimulations(this.countSimulations);
      return;
    }
    emitter.once(solutionChecked).then((data) => {
      if (data === 'resolved') {
        console.log('Output валиден, запуск новой симуляции');
        runInAction(() => {
          this.exceptions = requisiteIndex;
          this.countSimulations++;
        });

        this.context.logicField.clearStates();
        this.context.logicField.clearSignals();
        this.context.logicField.clearArrowsStates();
        this.context.logicField.clearPatternArrows();
        
        this.runAllSimulations();
      }
      if (data === 'rejected') {
        console.log('Output не валиден, возвращение в состояние Solving');
        runInAction(() => {
          this.countSimulations++;
          this.context.setStatusCompleted('rejected');
          this.setCountSimulations(this.countSimulations);
        });
      }
    });
  };

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

  public canBeErased = () => {
    return false;
  };

  public canBeDrawn = () => {
    return false;
  };

  private set exceptions(exception: number) {
    this._exceptions.push(exception);
  }

  public returnToSolving = () => {
    this.context.logicField.clearStates();
    this.context.logicField.clearSignals();
    this.context.logicField.clearArrowsStates();
    this.context.logicField.clearPatternArrows();
    this.context.setState(createStateSolving(this.context));
  };

  private setCountSimulations = (countSimulations) => {
    const challenges = this.context.challenges.map((challenge, i) => {

      this._solutionRepo.createCleanCopy(this._fields.arrowCache, this._routerServ.params.levelId, '1');
      if (this.context.statusCompleted === 'completed') {
        return { ...challenge, barColor: 'green' };
      }
      if (this.context.statusCompleted === 'rejected') {
        this._solutionRepo.createDraft(this._fields.arrowCache, this._routerServ.params.levelId, '1');
        if (i < countSimulations - 1) {
          return { ...challenge, barColor: 'green' };
        }
        if (i === countSimulations - 1) {
          return { ...challenge, barColor: 'tomato' };
        }
        if (i > countSimulations - 1) {
          return { ...challenge, barColor: '#ccc' };
        }
      }
    });
    
    this.context.setChallenges(challenges);
  };
}

export const createStateBulkChecking = (
  context: LevelContext,
  requisiteIndex: number,
) => {
  return new StateBulkChecking(
    context,
    requisiteIndex,
    loopInstance,
    solutionRepository,
    routerService,
    fields
  );
};
