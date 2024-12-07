import { LevelContext } from "../Level";
import { StateCompleted } from "../StateCompleted";
import { createStateSolving } from "../StateSolving";
import { IState } from "../types";
import { type Loop, loop as loopInstance } from "../../mapContainer/systems";
import { emitter } from "../../../shared/services/EventEmitterService";
import { runInAction } from "mobx";
import { solutionChecked } from "../../Logic/Base";

// Состояние "BulkChecking"
export class StateBulkChecking implements IState {
  public status = 'level.checking.bulk'
  private _exceptions: number[] = [];
  constructor(private readonly context: LevelContext, private readonly _requisiteIndex: number, private readonly loop: Loop) {
    this.exceptions = _requisiteIndex
    this.runAllSimulations();
  }

  public handleNext() {
    console.log("В состоянии BulkChecking: Запуск массовой проверки симуляций");
    this.checkMultipleSimulations(true);
  }

  public handlePrev() {
    console.log("Проверка симуляций провалена, возвращение в состояние Solving");
    this.context.setState(createStateSolving(this.context));
  }

  private runAllSimulations = () => {
    this.loop.setDuration(10);
    this.context.logicField.paused = false;
    let requisiteIndex = this.context.initRequisites(this._exceptions);
    if(requisiteIndex instanceof Error && requisiteIndex.cause === 'ALL_ARE_EXCEPTIONS') {
      console.info('MOLODETS');
      //this.context.setState(new StateCompleted(this.context));
      return;
    }
    emitter.once(solutionChecked).then(data => {
      console.log(data);
      if (data === 'resolved') {
        console.log("Output валиден, запуск новой симуляции");
        this.exceptions = requisiteIndex
        this.context.logicField.clearStates();
        this.context.logicField.clearSignals();
        this.context.logicField.clearArrowsStates();
        this.context.logicField.clearPatternArrows();
        
        this.runAllSimulations();
      }
      if (data === 'rejected') {
        console.log("Output не валиден, возвращение в состояние Solving");
        this.returnToSolving();
      }
    });
  }

  public canBeErased = (tile) => {
    return false
  }

  public canBeDrawn = (tile) => {
    return false
  }
  
  private set exceptions(exception: number) {
    this._exceptions.push(exception);
  }

  public returnToSolving = () => {
    this.context.logicField.clearStates();
    this.context.logicField.clearSignals();
    this.context.logicField.clearArrowsStates();
    this.context.logicField.clearPatternArrows();
    this.context.setState(createStateSolving(this.context));
  }
}

export const createStateBulkChecking = (context: LevelContext, requisiteIndex: number) => {
  return new StateBulkChecking(context, requisiteIndex, loopInstance);
}
