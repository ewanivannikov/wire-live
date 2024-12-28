import { LevelRepository, levelRepository } from '../LevelRepository';
import { solutions } from './solutions';

export class SolutionRepository {
constructor(private readonly levelRepo: LevelRepository) {}

  public getSolutions(levelId = 'DeMorgan', userId = '1') {
    return solutions[`${levelId}:${userId}`];
  }

  public checkSolutions(levelId = 'DeMorgan', userId = '1') {
    console.log(1);
    console.log(solutions[`${levelId}:${userId}`]);
    
    return Boolean(solutions[`${levelId}:${userId}`]);
  }

  public getDraft(levelId = 'DeMorgan', userId = '1') {
      return solutions[`${levelId}:${userId}`]?.[0]
  }

  public createDraft(map, levelId = 'DeMorgan', userId = '1') {
    const userMap = this.levelRepo.getUserMap(levelId, map);
    return {
        status: 'draft',
        map: userMap
    }
 }

  public getSolutionList = () => {
    return Object.values(solutions);
  };
}

export const solutionRepository = new SolutionRepository(levelRepository);
