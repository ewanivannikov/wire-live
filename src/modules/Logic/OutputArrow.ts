import { Fields } from './Base';
import { ArrowBase } from './ArrowBase';

class OutputArrow extends ArrowBase {
  public index = -1;
  public loop = 0;
  public isValidIn = true;
  private patternLength = 0;
  private patternValidation: string[] = [];
  constructor(
    position: string,
    public pattern: number[] = [1],
    public cycling: boolean = false,
    public active: number = 1,
    public waiting: number = -1,
  ) {
    super('OutputArrow', position);
    this.active = 2 * this.active - 1;
    this.active = -this.active;
  }

  conditionStates(fields: Fields) {
    if (
      this.waiting === -1 &&
      fields.getSignal(this.position.coordinates) >= 1
    ) {
      this.waiting = 0;
    }
    if (this.waiting != 0) {
      this.state = 'Wait';
    } else if (
      (this.active === 1 && fields.getSignal(this.position.coordinates) >= 1) ||
      (this.active === -1 && fields.getSignal(this.position.coordinates) === 0)
    ) {
      this.isValidIn = this.isValidIn && true;
    } else {
      this.isValidIn = this.isValidIn && false;
    }
    if (this.waiting === 0) {
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
    }
    if (this.waiting > 0) {
      this.waiting = this.waiting - 1;
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
    this.patternLength = this.pattern.reduce((acc, cor) => acc + cor, 0);
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
