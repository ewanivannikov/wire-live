import { arrowToIndexTile } from "../../../modules/Logic/constants";
import { getRandomNumberExceptExceptions } from "../../../shared/utils/getRandomNumberExceptExceptions";
import { solutions } from "./solutions";
import { patternArrowCache } from "./patternArrowCache";

export class SolutionRepository {

  public getSolution(levelId = 'DeMorgan', userId = '1') {
    return solutions[`${levelId}:${userId}`]
  }

  public getSolutionList = () => {
    return Object.values(solutions);
  }
}

export const solutionRepository = new SolutionRepository()
