import { makeAutoObservable } from 'mobx';

export class OutputArrowModel {
  public waitingValue = -1;
  public hasCycle = false;
  public pattern = [1, 1, 2];
  public label = 'A';
  constructor() {
    makeAutoObservable(this);
  }

  public get fields() {
    return {
      waiting: Number(this.waitingValue),
      hasCycle: this.hasCycle,
      pattern: this.pattern,
      label: this.label,
    };
  }

  public setWaitingValue = (value: number) => {
    this.waitingValue = value;
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

  public setLabel = (label: string) => {
    this.label = label;
  };
}

export const outputArrowModel = new OutputArrowModel();
