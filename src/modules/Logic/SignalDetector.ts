import { Fields } from './Base';
import { ArrowBase } from './ArrowBase';
import { Direction } from './types';

class SignalDetector extends ArrowBase {
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

    if (!(fields.getState(newPosition.coordinates) === 'None') && fields.getSignal(this.position.coordinates) >= 0) {
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

export const createSignalDetector = (position: string, direction: Direction) =>
  new SignalDetector(position, direction);
