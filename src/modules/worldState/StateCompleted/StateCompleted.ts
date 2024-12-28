import { makeAutoObservable } from 'mobx';
import {
  levelRepository,
  LevelRepository,
} from '../../../data/repositories/LevelRepository';
import { routerService, RouterService } from '../../../shared';
import { SolutionRepository, solutionRepository } from '../../../data/repositories/SolutionRepository/SolutionRepository';
import { Fields, fields } from '../../Logic/Base';

export class StateCompleted {
  public status = 'idel';
  public challenges = [{ barColor: 'green', amount: 100 }];
  constructor(
    private readonly levelRepo: LevelRepository,
    private readonly solutionRepo: SolutionRepository,
    private readonly routerServ: RouterService,
    private readonly _fields: Fields,
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
        this.solutionRepo.createDraft(this._fields.arrowCache, this.routerServ.params.levelId, '1');
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
  solutionRepository,
  routerService,
  fields
);
