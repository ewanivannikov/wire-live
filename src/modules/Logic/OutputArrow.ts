import { Fields } from './Base';
import { ArrowBase } from './ArrowBase';
import { createBinaryArray } from '../../shared/utils/createBinaryArray';

class OutputArrow extends ArrowBase {
  public index = 0;
  public binaryArray : number[] = [];
  public isValidIn = true;
  private patternLength = 0;
  private patternValidation: string[] = [];
  constructor(
    position: string,
    public pattern: number[],
    public cycling: boolean = false,
    public active: number = 1,
    public waiting: number = -1,
  ) {
    super('OutputArrow', position);
    this.binaryArray = createBinaryArray(pattern ?? [1], this.active);
  }

  conditionStates(fields: Fields) {
    if (this.waiting === 0) {
      if (this.index < this.binaryArray.length) {this.active = this.binaryArray[this.index];
        this.index = this.index + 1} else {
          if (this.cycling) {
            this.index = this.index % this.binaryArray.length
            this.active = this.binaryArray[this.index]
            this.index = this.index + 1
          } else {this.active = 1-this.binaryArray[this.index-1]}
        }
      this.isValidIn = this.isValidIn && (((this.active === 1) && (fields.getSignal(this.position.coordinates) >= 1)) ||
      ((this.active === 0) && (fields.getSignal(this.position.coordinates) === 0)))
    }
    if (this.waiting > 0) {this.waiting = this.waiting - 1}
    if ((this.waiting === -1) && (fields.getSignal(this.position.coordinates) >= 1)) {
      this.waiting = 0
    }

    if (this.waiting != 0) {
      this.state = 'Wait';
    } else if (this.isValidIn) {
      this.state = 'Venus';
      this.patternValidation.push(this.state);
    } else {
      this.state = 'Mars';
      this.patternValidation.push(this.state);
    }
  }

  activeStates(fields: Fields) {}

  public get validated() {
    this.patternLength = this.binaryArray.length;
    if (this.patternValidation.includes('Mars')) return 'rejected';
    if (
      this.patternValidation.every((item) => item === 'Venus') &&
      this.patternValidation.length >= this.patternLength
    )
      return 'resolved';
    return 'waiting';
  }
}

export const createOutputArrow = (
  position: string,
  pattern: number[],
  cycling?: boolean,
  active?: number,
  waiting?: number,
) => new OutputArrow(position, pattern, cycling, active, waiting);
