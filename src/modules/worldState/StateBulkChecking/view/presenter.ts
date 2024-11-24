import { makeAutoObservable } from "mobx"

class StateBulkCheckingPresenter {
    public amountArrows = 0
    public averageSteps = 0
    public challenges = [
        {barColor: 'green', amount: 50},
        {barColor: 'tomato', amount: 100},
        {barColor: '#ccc', amount: 50},
      ]
      public showAverageSteps = false
    constructor() {
        makeAutoObservable(this)
    }
}

export const stateBulkCheckingPresenter = new StateBulkCheckingPresenter()