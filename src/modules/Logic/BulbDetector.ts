import { Fields } from './Base';
import { ArrowBase } from './ArrowBase';
import { Direction } from './types';

class BulbDetector extends ArrowBase {
  constructor(position: string, direction: Direction) {
    super('SignalDetector', position, direction);
  }

  conditionStates(fields: Fields) {
    let newPosition = this.position;
    if (this.direction === 'Up') {
      newPosition = newPosition.add(0, 1);
    } else if (this.direction === 'Down') {
      newPosition = newPosition.add(0, -1);
    } else if (this.direction === 'Left') {
      newPosition = newPosition.add(1, 0);
    } else if (this.direction === 'Right') {
      newPosition = newPosition.add(-1, 0);
    }

    if (
      !(fields.getState(newPosition.coordinates) === 'None') &&
      fields.getSignal(this.position.coordinates) >= 0
    ) {
      this.state = 'Earth';
    } else {
      this.state = 'None';
    }
  }

  activeStates(fields: Fields) {}
}

export const createBulbDetector = (position: string, direction: Direction) =>
  new BulbDetector(position, direction);
