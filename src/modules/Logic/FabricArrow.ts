import { Direction } from './types';
import { createArrow } from './Arrow';
import { createSourceBlock } from './SourceBlock';

export const fabricArrow = (nameType: string, position: string, direction: Direction) => {
  if (nameType === 'Arrow') {
    const result = createArrow(position, direction);
    return result;
  }

  if (nameType === 'SourceBlock') {
    const result = createSourceBlock(position);
    return result;
  }
};
