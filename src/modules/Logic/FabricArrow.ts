import { createArrow } from './Arrow';
import { Position } from './Position';

export const fabricArrow = (nameType, position, direction) => {
  if (nameType == 'Arrow') {
    const result = createArrow(position, direction)
    return result
  }
}
