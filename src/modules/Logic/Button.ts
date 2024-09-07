import { Fields } from './Base';
import { ArrowBase } from './ArrowBase';

class Button extends ArrowBase {
  constructor(position: string) {
    super('Button', position);
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
      const newPosition = this.position;
      const upPosition = newPosition.add(0, -1);
      const downPosition = newPosition.add(0, 1);
      const leftPosition = newPosition.add(-1, 0);
      const rightPosition = newPosition.add(1, 0);

      fields.addSignal(upPosition.coordinates, 1);
      fields.addSignal(downPosition.coordinates, 1);
      fields.addSignal(leftPosition.coordinates, 1);
      fields.addSignal(rightPosition.coordinates, 1);
    }
  }
}

export const createButton = (position: string) =>
  new Button(position);
