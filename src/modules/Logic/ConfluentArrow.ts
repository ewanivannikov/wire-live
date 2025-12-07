import { Fields } from './Base';
import { ArrowBase } from './ArrowBase';
import { Direction } from './types';

class ConfluentArrow extends ArrowBase {
  constructor(position: string, direction: Direction) {
    super('ConfluentArrow', position, direction);
  }

  conditionStates(fields: Fields) {
    if ((fields.getSignal(this.position.coordinates) >= 1)) {
      if (this.state === 'None' || this.state === 'Bright') {
        this.state = 'Underbright';
      } else {
        this.state = 'Overbright';
      }
    } else {
      if (this.state === 'None' || this.state === 'Bright') {
        this.state = 'None';
      } else {
        this.state = 'Bright';
      }
    }
  }

  activeStates(fields: Fields) {
    if (this.state === 'Bright' || this.state === 'Overbright') {
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

export const createConfluentArrow = (position: string, direction: Direction) =>
  new ConfluentArrow(position, direction);
