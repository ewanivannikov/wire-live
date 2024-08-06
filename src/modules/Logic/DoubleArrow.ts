import { Fields } from './Base';
import { ArrowBase } from './ArrowBase';
import { Direction } from './types';

class DoubleArrow extends ArrowBase {
  constructor(position: string, direction: Direction) {
    super('DoubleArrow', position, direction);
  }

  conditionStates(fields: Fields) {
    if (fields.getSignal(this.position.coordinates) >= 1) {
      this.state = 'Red';
    } else {
      this.state = 'None';
    }
  }

  activeStates(fields: Fields) {
    if (this.state === 'Red') {
      let newPosition = this.position;
      if (this.direction === 'Up') {
        newPosition = newPosition.add(0, -1);
        newPosition = newPosition.add(0, -2);
      } else if (this.direction === 'Down') {
        newPosition = newPosition.add(0, 1);
        newPosition = newPosition.add(0, 2);
      } else if (this.direction === 'Left') {
        newPosition = newPosition.add(-1, 0);
        newPosition = newPosition.add(-2, 0);
      } else if (this.direction === 'Right') {
        newPosition = newPosition.add(1, 0);
        newPosition = newPosition.add(2, 0);
      }

      fields.addSignal(newPosition.coordinates, 1);
    }
  }
}

export const createDoubleArrow = (position: string, direction: Direction) =>
  new DoubleArrow(position, direction);
