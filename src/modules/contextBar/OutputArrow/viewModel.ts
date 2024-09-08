import { makeAutoObservable } from 'mobx';

export class OutputArrowModel {
  public waitingValue = 1;
  public waitingOperator = '=';
  public hasCycle = false;
  public pattern = [1, 1, 2];
  constructor() {
    makeAutoObservable(this);
  }

  public get fields() {
    return {
      waiting: `${this.waitingOperator}${this.waitingValue}`,
      hasCycle: this.hasCycle,
      pattern: this.pattern,
    };
  }

  public setWaitingValue = (value: number) => {
    this.waitingValue = value;
  };

  public setWaitingOperator = (value: string) => {
    this.waitingOperator = value;
  };

  public setHasCycle = (value: boolean) => {
    this.hasCycle = value;
  };

  public removePatternElement = (index: number) => {
    this.pattern.splice(index, 1);
  };

  public addPatternElement = (element: number) => {
    this.pattern.push(element);
  };
}

export const outputArrowModel = new OutputArrowModel();
