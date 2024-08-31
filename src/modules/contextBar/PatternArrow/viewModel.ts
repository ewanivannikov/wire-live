import { makeAutoObservable } from 'mobx';

export class PatternArrowModel {
  public initialValue = 1;
  public hasCycle = false;
  public pattern = [1, 1, 2];
  constructor() {
    makeAutoObservable(this);
  }

  public get fields() {
    return {
      initialValue: this.initialValue,
      hasCycle: this.hasCycle,
      pattern: this.pattern,
    };
  }

  public setInitialValue = (value: number) => {
    this.initialValue = value;
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

export const patternArrowModel = new PatternArrowModel();
