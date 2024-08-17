import { Fields } from './Base';
import { ArrowBase } from './ArrowBase';
import { Direction } from './types';

class OppositeArrow extends ArrowBase {
  constructor(position: string, direction: Direction) {
    super('OppositeArrow', position, direction);
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
      const newPosition = this.position;
      if (this.direction === 'Up' || this.direction === 'Down') {
        fields.addSignal(newPosition.add(0, -1).coordinates, 1);
        fields.addSignal(newPosition.add(0, 1).coordinates, 1);
      } else if (this.direction === 'Left' || this.direction === 'Right') {
        fields.addSignal(newPosition.add(-1, 0).coordinates, 1);
        fields.addSignal(newPosition.add(1, 0).coordinates, 1);
      }
    }
  }
}

export const createOppositeArrow = (position: string, direction: Direction) =>
  new OppositeArrow(position, direction);
