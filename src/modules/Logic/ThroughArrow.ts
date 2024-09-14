import { Fields } from './Base';
import { ArrowBase } from './ArrowBase';
import { Direction } from './types';

class ThroughArrow extends ArrowBase {
  constructor(position: string, direction: Direction) {
    super('ThroughArrow', position, direction);
  }

  conditionStates(fields: Fields) {
    if (fields.getSignal(this.position.coordinates) >= 1) {
      this.state = 'Earth';
    } else {
      this.state = 'None';
    }
  }

  activeStates(fields: Fields) {
    if (this.state === 'Earth') {
      let newPosition = this.position;
      if (this.direction === 'Up') {
        newPosition = newPosition.add(0, -2);
      } else if (this.direction === 'Down') {
        newPosition = newPosition.add(0, 2);
      } else if (this.direction === 'Left') {
        newPosition = newPosition.add(-2, 0);
      } else if (this.direction === 'Right') {
        newPosition = newPosition.add(2, 0);
      }

      fields.addSignal(newPosition.coordinates, 1);
    }
  }
}

export const createThroughArrow = (position: string, direction: Direction) =>
  new ThroughArrow(position, direction);
