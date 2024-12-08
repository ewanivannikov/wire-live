import { makeAutoObservable } from "mobx"

export class StateCompleted {
    public status = 'idel'
    public challenges = [
        {barColor: 'green', amount: 100},
        {barColor: '#ccc', amount: 100},
        {barColor: '#ccc', amount: 100},
        {barColor: '#ccc', amount: 100},
        {barColor: '#ccc', amount: 100},
    ]
    constructor() {
        makeAutoObservable(this)
    }

    public setStatus = (status) => {
        this.status = status
    }

    public setCountSimulations = (countSimulations) => {
        this.challenges = this.challenges.map((challenge, i) => {
            if (this.status === 'completed') {
                return {...challenge, barColor: 'green'}
            }
            if (this.status === 'rejected') {
                if (i < countSimulations-1) {
                    return {...challenge, barColor: 'green'}
                }
                if (i === countSimulations-1) {
                    return {...challenge, barColor: 'tomato'}
                }
                if (i > countSimulations-1) {
                    return {...challenge, barColor: '#ccc'}
                }
            }
        })
    }
}

export const stateCompleted = new StateCompleted()