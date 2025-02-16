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
  label?: string,
  cycles?: number,
) => {
  if (nameType === 'InputArrow') {
    const result = createInputArrow(
      position,
      direction,
      pattern,
      cycling,
      active,
      label
    );
    return result;
  }
  if (nameType === 'OutputArrow') {
    const result = createOutputArrow(
      position,
      pattern,
      cycling,
      active,
      cycles,
      label,
    );
    return result;
  }
};
