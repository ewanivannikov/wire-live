import { Fields } from './Base';
import { ArrowBase } from './ArrowBase';

class SourceBlock extends ArrowBase {
  constructor(position: string) {
    super('SourceBlock', position);
  }

  conditionStates(fields: Fields) {
    if (fields.getSignal(this.position.coordinates) >= 0) {
      this.state = 'Bright';
    } else {
      this.state = 'None';
    }
  }

  activeStates(fields: Fields) {
    if (this.state === 'Bright') {
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

export const createSourceBlock = (position: string) =>
  new SourceBlock(position);
