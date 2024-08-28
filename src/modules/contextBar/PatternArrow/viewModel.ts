import { makeAutoObservable } from "mobx";

class PatternArrow {
  public initialValue = 0
  public hasCycle = false
  public pattern = [0, 1, 0, 1, 1, 0, 1, 0]
  constructor() {
    makeAutoObservable(this);
  }


  public updateInitialValue = (initialValue) => {
    this.initialValue = initialValue
  }

  public updateHasCycle = (hasCycle) => {
    this.hasCycle = hasCycle
  }

  public updatePattern = (pattern) => {
    this.pattern = pattern
  }
}

export const patternArrow = new PatternArrow()
