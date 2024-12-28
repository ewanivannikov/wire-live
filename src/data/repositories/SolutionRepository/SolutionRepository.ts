import { makeAutoObservable } from 'mobx';
import { ArrowBase } from '../../../modules/Logic/ArrowBase';
import { LevelRepository, levelRepository } from '../LevelRepository';
import { UserRepository, userRepository } from '../UserRepository';
import { solutions } from './solutions';

export class SolutionRepository {
  constructor(private readonly levelRepo: LevelRepository, private readonly _userRepo: UserRepository) {
    makeAutoObservable(this);
  }

  public getSolutions(levelId = 'DeMorgan', userId = '1') {
    return solutions[`${levelId}:${userId}`];
  }

  public checkSolutions(levelId = 'DeMorgan', userId = '1') {
    return Boolean(solutions[`${levelId}:${userId}`]);
  }

  public getDraft(levelId = 'DeMorgan', userId = '1') {
    return solutions[`${levelId}:${userId}`]?.[0];
  }

  public createDraft(map: Map<string, ArrowBase>, levelId = 'DeMorgan') {
    const userMap = this.levelRepo.getUserMap(levelId, map);
    const input = {
      status: 'draft',
      map: userMap,
    };
    const query =this._userRepo.getUserQuery();
    const userId =query.state.data?.id
    console.log('createDraft', input, userId);
  }

  public createCleanCopy(map: Map<string, ArrowBase>, levelId = 'DeMorgan') {
    const userMap = this.levelRepo.getUserMap(levelId, map);
    const input = {
      status: 'cleanCopy',
      map: userMap,
    };
    console.log('createCleanCopy', input);
  }

  public getSolutionList = () => {
    return Object.values(solutions);
  };
}

export const solutionRepository = new SolutionRepository(levelRepository, userRepository);
