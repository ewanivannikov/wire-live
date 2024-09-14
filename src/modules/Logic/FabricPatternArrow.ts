import { Direction } from './types';
import { createInputArrow } from './InputArrow';
import { createOutputArrow } from './OutputArrow';

export const fabricPatternArrow = (
  nameType: string,
  position: string,
  pattern: number[],
  direction?: Direction,
  cycling?: boolean,
  active?: number,
  waiting?: number,
) => {
  if (nameType === 'InputArrow') {
    const result = createInputArrow(
      position,
      direction,
      pattern,
      cycling,
      active,
    );
    return result;
  }
  if (nameType === 'OutputArrow') {
    const result = createOutputArrow(
      position,
      pattern,
      cycling,
      active,
      waiting,
    );
    return result;
  }
};
