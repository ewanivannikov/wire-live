import { Fields } from './Base';
import { ArrowBase } from './ArrowBase';
import { Direction } from './types';

class InputArrow extends ArrowBase {
  public index = -1;
  public loop = 0;
  constructor(
    position: string,
    direction: Direction,
    public pattern: number[] = [1],
    public cycling: boolean = false,
    public active: number = 1,
  ) {
    super('InputArrow', position, direction);
    this.active = 2 * this.active - 1;
    this.active = -this.active;
  }

  conditionStates(fields: Fields) {
    if (this.loop === 0) {
      this.index = this.index + 1;
      if (this.index === this.pattern.length) {
        if (this.cycling) {
          this.index = 0;
          this.loop = this.pattern[this.index];
          this.active = this.active / Math.pow(-1, this.pattern.length);
        } else {
          this.index = this.pattern.length - 1;
          this.loop = -1;
        }
      } else {
        this.loop = this.pattern[this.index];
      }
      this.active = -this.active;
    }
    this.loop = Math.max(this.loop - 1, -1);
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
) => new InputArrow(position, direction, pattern, cycling, active);
