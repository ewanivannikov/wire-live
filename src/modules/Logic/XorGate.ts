import { Fields } from './Base';
import { ArrowBase } from './ArrowBase';
import { Direction } from './types';

class XorGate extends ArrowBase {
  constructor(position: string, direction: Direction) {
    super('XorGate', position, direction);
  }

  conditionStates(fields: Fields) {
    if (
      fields.getSignal(this.position.coordinates) >= 1 &&
      fields.getSignal(this.position.coordinates) % 2 === 1
    ) {
      this.state = 'Earth';
    } else {
      this.state = 'None';
    }
  }

  activeStates(fields: Fields) {
    if (this.state === 'Earth') {
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

export const createXorGate = (position: string, direction: Direction) =>
  new XorGate(position, direction);
