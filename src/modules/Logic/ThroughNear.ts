import { Fields } from './Base';
import { ArrowBase } from './ArrowBase';
import { Direction, Flip } from './types';

class ThroughNear extends ArrowBase {
  constructor(position: string, direction: Direction, flip: Flip) {
    super('ThroughNear', position, direction, flip);
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
      let newDirection = this.direction
      if (newDirection === 'Up') {
        fields.addSignal(newPosition.add(0, -2).coordinates, 1);
        let n = 1;
        if (this.flip === '<'){ n = -1 }
        fields.addSignal(newPosition.add(n, 0).coordinates, 1);
      } else if (newDirection === 'Down') {
        fields.addSignal(newPosition.add(0, 2).coordinates, 1);
        let n = 1;
        if (this.flip === '<'){ n = -1 }
        fields.addSignal(newPosition.add(-n, 0).coordinates, 1);
      } else if (newDirection === 'Left') {
        fields.addSignal(newPosition.add(-2, 0).coordinates, 1);
        let n = 1;
        if (this.flip === '<'){ n = -1 }
        fields.addSignal(newPosition.add(0, -n).coordinates, 1);
      } else if (newDirection === 'Right') {
        fields.addSignal(newPosition.add(2, 0).coordinates, 1);
        let n = 1;
        if (this.flip === '<'){ n = -1 }
        fields.addSignal(newPosition.add(0, n).coordinates, 1);
      }

    }
  }
}

export const createThroughNear = (position: string, direction: Direction, flip: Flip) =>
  new ThroughNear(position, direction, flip);
