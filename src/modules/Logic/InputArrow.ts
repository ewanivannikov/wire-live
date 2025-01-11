import { Fields } from './Base';
import { ArrowBase } from './ArrowBase';
import { Direction } from './types';
import { createBinaryArray } from '../../shared/utils/createBinaryArray';

class InputArrow extends ArrowBase {
  public index = 0;
  private binaryArray: number[];

  constructor(
    position: string,
    direction: Direction,
    public pattern: number[],
    public cycling: boolean = false,
    public active: number = 1,
    public label: string = 'A',
  ) {
    super('InputArrow', position, direction);
    this.binaryArray = createBinaryArray(pattern || [1], this.active);
  }

  conditionStates(fields: Fields) {
    if (this.index < this.binaryArray.length) {
      this.active = this.binaryArray[this.index];
      this.index = this.index + 1
    } else {
      if (this.cycling) {
        this.index = this.index % this.binaryArray.length
        this.active = this.binaryArray[this.index]
        this.index = this.index + 1
      } else { this.active = 1 - this.binaryArray[this.index - 1] }
    }
    if (this.active === 1) {
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

      fields.addSignal(newPosition.coordinates, 1);
    }
  }
}

export const createInputArrow = (
  position: string,
  direction: Direction,
  pattern: number[],
  cycling?: boolean,
  active?: number,
  label?: string,
) => new InputArrow(position, direction, pattern, cycling, active, label);
