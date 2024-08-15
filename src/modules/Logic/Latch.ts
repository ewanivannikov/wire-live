import { Fields } from './Base';
import { ArrowBase } from './ArrowBase';
import { Direction } from './types';

class Latch extends ArrowBase {
  constructor(position: string, direction: Direction) {
    super('Latch', position, direction);
  }

  conditionStates(fields: Fields) {
    if ((this.state === 'None') && (fields.getSignal(this.position.coordinates) >= 2)) {
      this.state = 'Red';
    } else if ((this.state === 'Red') && (fields.getSignal(this.position.coordinates) === 1)) {
      this.state = 'None';
    }
  }

  activeStates(fields: Fields) {
    if (this.state === 'Red') {
      let newPosition = this.position;
      if (this.direction === 'Up') {
        newPosition = newPosition.add(0, -1);
      } else if (this.direction === 'Down') {
        newPosition = newPosition.add(0, 1);
      } else if (this.direction === 'Left') {
        newPosition = newPosition.add(-1, 0);
      } else if (this.direction === 'Right') {
        newPosition = newPosition.add(1, 0);
      }

      fields.addSignal(newPosition.coordinates, 1);
    }
  }
}

export const createLatch = (position: string, direction: Direction) =>
  new Latch(position, direction);
