import { makeAutoObservable } from "mobx"
import {stateCompleted} from "../../StateCompleted"
import { type StateCompleted } from "../../StateCompleted"

class StateBulkCheckingPresenter {
    public amountArrows = 0
    public averageSteps = 0
    public showAverageSteps = false
    constructor(private readonly _stateCompleted: StateCompleted) {
        makeAutoObservable(this)
    }

    public get status(){
return this._stateCompleted.status
    }

    public get challenges() {
        return this._stateCompleted.challenges
    }
}

export const stateBulkCheckingPresenter = new StateBulkCheckingPresenter(stateCompleted)