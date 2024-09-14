import { Fields } from './Base';
import { ArrowBase } from './ArrowBase';
import { Direction } from './types';

class Blocker extends ArrowBase {
  constructor(position: string, direction: Direction) {
    super('Blocker', position, direction);
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
        newPosition = newPosition.add(0, -1);
      } else if (this.direction === 'Down') {
        newPosition = newPosition.add(0, 1);
      } else if (this.direction === 'Left') {
        newPosition = newPosition.add(-1, 0);
      } else if (this.direction === 'Right') {
        newPosition = newPosition.add(1, 0);
      }
      let signal = fields.getSignal(newPosition.coordinates);
      signal = (signal + Math.abs(signal)) / 2 + 1;
      console.log('signal', signal);

      fields.addSignal(newPosition.coordinates, -signal);
    }
  }
}

export const createBlocker = (position: string, direction: Direction) =>
  new Blocker(position, direction);
