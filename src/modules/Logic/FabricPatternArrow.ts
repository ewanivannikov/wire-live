import { Direction } from './types';
import { createInputArrow } from './InputArrow';

export const fabricPatternArrow = (
  nameType: string,
  position: string,
  pattern: number[],
  direction?: Direction,
  cycling?: boolean,
  active?: number,
) => {
  if (nameType === 'InputArrow') {
    const result = createInputArrow(position, direction, pattern, cycling, active);
    return result;
  }
};
