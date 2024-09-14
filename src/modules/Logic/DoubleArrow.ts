import { Fields } from './Base';
import { ArrowBase } from './ArrowBase';
import { Direction } from './types';

class DoubleArrow extends ArrowBase {
  constructor(position: string, direction: Direction) {
    super('DoubleArrow', position, direction);
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
      const newPosition = this.position;
      if (this.direction === 'Up') {
        fields.addSignal(newPosition.add(0, -1).coordinates, 1);
        fields.addSignal(newPosition.add(0, -2).coordinates, 1);
      } else if (this.direction === 'Down') {
        fields.addSignal(newPosition.add(0, 1).coordinates, 1);
        fields.addSignal(newPosition.add(0, 2).coordinates, 1);
      } else if (this.direction === 'Left') {
        fields.addSignal(newPosition.add(-1, 0).coordinates, 1);
        fields.addSignal(newPosition.add(-2, 0).coordinates, 1);
      } else if (this.direction === 'Right') {
        fields.addSignal(newPosition.add(1, 0).coordinates, 1);
        fields.addSignal(newPosition.add(2, 0).coordinates, 1);
      }
    }
  }
}

export const createDoubleArrow = (position: string, direction: Direction) =>
  new DoubleArrow(position, direction);
