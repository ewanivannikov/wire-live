import { makeAutoObservable } from 'mobx';

export type BrushOprtions = {
  initialValue: 0 | 1;
  hasCycle: boolean;
  pattern: number[];
  label: string;
};

export class InputArrowModel {
  public initialValue = 1;
  public hasCycle = false;
  public pattern = [1, 1, 2];
  public label = 'A';
  constructor() {
    makeAutoObservable(this);
  }

  public get fields() {
    return {
      initialValue: this.initialValue,
      hasCycle: this.hasCycle,
      pattern: this.pattern,
      label: this.label,
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

  public setLabel = (label: string) => {
    this.label = label;
  };
}

export const inputArrowModel = new InputArrowModel();
