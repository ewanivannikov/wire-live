import { makeAutoObservable } from 'mobx';
import { ArrowBase } from '../../../modules/Logic/ArrowBase';
import { LevelRepository, levelRepository } from '../LevelRepository';
import { UserRepository, userRepository } from '../UserRepository';
import { solutions } from './solutions';

export class SolutionRepository {
  constructor(private readonly levelRepo: LevelRepository, private readonly _userRepo: UserRepository) {
    makeAutoObservable(this);
  }

  public getSolutions(levelId = 'Sketch', userId = '1') {
    return solutions[`${levelId}:${userId}`];
  }

  public checkSolutions(levelId = 'Sketch', userId = '1') {
    return Boolean(solutions[`${levelId}:${userId}`]);
  }

  public getDraft(levelId = 'Sketch', userId = '1') {
    return solutions[`${levelId}:${userId}`]?.[0];
  }

  public createDraft(map: Map<string, ArrowBase>, levelId = 'Sketch') {
    const userMap = this.getUserMap(levelId, map);
    const input = {
      status: 'draft',
      map: userMap,
    };
    const query =this._userRepo.getUserQuery();
    const userId =query.state.data?.id
    console.log('createDraft', input, userId);
  }

  public createCleanCopy(map: Map<string, ArrowBase>, levelId = 'Sketch') {
    const userMap = this.getUserMap(levelId, map);
    const input = {
      status: 'cleanCopy',
      map: userMap,
    };
    console.log('createCleanCopy', input);
  }

  public getSolutionList = () => {
    return Object.values(solutions);
  };

  private getUserMap = (id = 'Sketch', map: Map<string, ArrowBase>) => {
    const level = this.levelRepo.getLevelById2(id)
    level.execute()
    for (let i = 0; i < level.data.length; i++) {
      map.delete(`${i.x},${i.y}`)
    }

    const userMap = this.levelRepo.createMap(map);
    return userMap;
  }
}

export const solutionRepository = new SolutionRepository(levelRepository, userRepository);
