import { Fields } from './Base';
import { ArrowBase } from './ArrowBase';
import { Direction } from './types';

class TrioArrow extends ArrowBase {
  constructor(position: string, direction: Direction) {
    super('TrioArrow', position, direction);
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
      let newPosition = this.position;
      if (this.direction === 'Up' || this.direction === 'Down') {
        if (this.direction === 'Up'){
            fields.addSignal(newPosition.add(0, -1).coordinates, 1);
        } else {
            fields.addSignal(newPosition.add(0, 1).coordinates, 1);
        }
        fields.addSignal(newPosition.add(-1, 0).coordinates, 1);
        fields.addSignal(newPosition.add(1, 0).coordinates, 1);
      } else if (this.direction === 'Left' || this.direction === 'Right') {
        if (this.direction === 'Left'){
            fields.addSignal(newPosition.add(-1, 0).coordinates, 1);
        } else {
            fields.addSignal(newPosition.add(1, 0).coordinates, 1);
        }
        fields.addSignal(newPosition.add(0, -1).coordinates, 1);
        fields.addSignal(newPosition.add(0, 1).coordinates, 1);
      }
    }
  }
}

export const createTrioArrow = (position: string, direction: Direction) =>
  new TrioArrow(position, direction);
