import { Fields } from './Base';
import { ArrowBase } from './ArrowBase';
import { Direction } from './types';

class Arrow extends ArrowBase {
  constructor(position: string, direction: Direction) {
    super('Arrow', position, direction);
  }

  conditionStates(fields: Fields) {
    if (fields.getSignal(this.position.coordinates) > 0) {
      super.state = 'Red';
    } else {
      super.state = 'None';
    }
  }

  activeStates(fields: Fields) {
    if (super.state === 'Red') {
      let newPosition = this.position;
      if (this.direction === 'Up') {
        newPosition = newPosition.add(0, 1);
      } else if (this.direction === 'Down') {
        newPosition = newPosition.add(0, -1);
      } else if (this.direction === 'Left') {
        newPosition = newPosition.add(-1, 0);
      } else if (this.direction === 'Right') {
        newPosition = newPosition.add(1, 0);
      }
      fields.addSignal(newPosition.coordinates, 1);
    }
  }
}

export const createArrow = (position: string, direction: Direction) =>
  new Arrow(position, direction);
