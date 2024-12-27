import { solutions } from './solutions';

export class SolutionRepository {
  public getSolution(levelId = 'DeMorgan', userId = '1') {
    return solutions[`${levelId}:${userId}`];
  }

  public getSolutionList = () => {
    return Object.values(solutions);
  };
}

export const solutionRepository = new SolutionRepository();
