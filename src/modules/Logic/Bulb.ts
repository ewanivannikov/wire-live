import { Fields } from './Base';
import { ArrowBase } from './ArrowBase';
import { Direction } from './types';

class Bulb extends ArrowBase {
  constructor(position: string, direction: Direction) {
    super('Arrow', position, direction);
  }

  conditionStates(fields: Fields) {
    if (fields.getSignal(this.position.coordinates) >= 1) {
      this.state = 'Sun';
    } else {
      this.state = 'None';
    }
  }

  activeStates(fields: Fields) {}
}

export const createBulb = (position: string, direction: Direction) =>
  new Bulb(position, direction);
