import { Fields } from './Base';
import { ArrowBase } from './ArrowBase';
import { Direction } from './types';

class DelayArrow extends ArrowBase {
  constructor(position: string, direction: Direction) {
    super('DelayArrow', position, direction);
  }

  conditionStates(fields: Fields) {
    if (
      fields.getSignal(this.position.coordinates) >= 1 &&
      this.state === 'None'
    ) {
      this.state = 'Blue';
    } else if (
      this.state === 'Blue' ||
      fields.getSignal(this.position.coordinates)
    ) {
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

export const createDelayArrow = (position: string, direction: Direction) =>
  new DelayArrow(position, direction);
