import { ArrowBase, Direction, Fields } from './Base';
import { Position } from './Position';

class Arrow extends ArrowBase {
  constructor(position: Position, direction: Direction) {
    super(position, direction, 'Arrow');
  }

  conditionStates(fields: Fields) {
    if (fields.getSignal(this.position) > 0) {
      super.state = 'Red';
    } else {
      super.state = 'None';
    }
  }

  activeStates(fields: Fields) {
    if (super.state == 'Red') {
      let newPosition = this.position;
      if (this.direction == 'Up') {
        newPosition = newPosition.add(0, 1);
      } else if (this.direction == 'Down') {
        newPosition = newPosition.add(0, -1);
      } else if (this.direction == 'Left') {
        newPosition = newPosition.add(-1, 0);
      } else if (this.direction == 'Right') {
        newPosition = newPosition.add(1, 0);
      }
      fields.addSignal(newPosition, 1);
    }
  }
}

export const createArrow = (position: Position, direction: Direction) => new Arrow(position, direction)
