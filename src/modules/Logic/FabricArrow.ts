import { Direction } from './types';
import { createArrow } from './Arrow';
import { createSourceBlock } from './SourceBlock';
import { createBlocker } from './Blocker';

export const fabricArrow = (
  nameType: string,
  position: string,
  direction?: Direction,
  flip?: boolean,
) => {
  if (nameType === 'Arrow') {
    const result = createArrow(position, direction);
    return result;
  }

  if (nameType === 'SourceBlock') {
    const result = createSourceBlock(position);
    return result;
  }

  if (nameType === 'Blocker') {
    const result = createBlocker(position, direction);
    return result;
  }
};
