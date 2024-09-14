import { Fields } from './Base';
import { ArrowBase } from './ArrowBase';
import { Direction, Flip } from './types';

class OrthogonalArrow extends ArrowBase {
  constructor(position: string, direction: Direction, flip: Flip) {
    super('OrthogonalArrow', position, direction, flip);
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
      const newDirection = this.direction;
      let n = 1;
      if (this.flip === '<') {
        n = -1;
      }
      if (newDirection === 'Up') {
        fields.addSignal(newPosition.add(0, -1).coordinates, 1);
        fields.addSignal(newPosition.add(n, 0).coordinates, 1);
      } else if (newDirection === 'Down') {
        fields.addSignal(newPosition.add(0, 1).coordinates, 1);
        fields.addSignal(newPosition.add(-n, 0).coordinates, 1);
      } else if (newDirection === 'Left') {
        fields.addSignal(newPosition.add(-1, 0).coordinates, 1);
        fields.addSignal(newPosition.add(0, -n).coordinates, 1);
      } else if (newDirection === 'Right') {
        fields.addSignal(newPosition.add(1, 0).coordinates, 1);
        fields.addSignal(newPosition.add(0, n).coordinates, 1);
      }
    }
  }
}

export const createOrthogonalArrow = (
  position: string,
  direction: Direction,
  flip: Flip,
) => new OrthogonalArrow(position, direction, flip);
