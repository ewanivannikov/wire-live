import { makeAutoObservable } from 'mobx';
import {
  levelRepository,
  LevelRepository,
} from '../../../data/repositories/LevelRepository';
import { routerService, RouterService } from '../../../shared';

export class StateCompleted {
  public status = 'idel';
  public challenges = [{ barColor: 'green', amount: 100 }];
  constructor(
    private readonly levelRepo: LevelRepository,
    private readonly routerServ: RouterService,
  ) {
    const lenReq = Object.keys(
      this.levelRepo.getLevelById(this.routerServ.params.levelId).requisites,
    ).length;
    for (let i = 1; i < lenReq; i++) {
      this.challenges.push({ barColor: '#ccc', amount: 100 });
    }
    makeAutoObservable(this);
  }

  public setStatus = (status) => {
    this.status = status;
  };

  public setCountSimulations = (countSimulations) => {
    this.challenges = this.challenges.map((challenge, i) => {
      if (this.status === 'completed') {
        return { ...challenge, barColor: 'green' };
      }
      if (this.status === 'rejected') {
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
  };
}

export const stateCompleted = new StateCompleted(
  levelRepository,
  routerService,
);
