import { Fields } from './Base';
import { ArrowBase } from './ArrowBase';

class OutputArrow extends ArrowBase {
  private index = -1;
  private loop = 0;
  public hasSolved = true;
  constructor(
    position: string,
    public pattern: number[],
    public cycling: boolean = false,
    public active: number = 1,
    public waiting: number = -1,
  ) {
    super('OutputArrow', position);
    this.active = 2 * this.active - 1;
    this.active = -this.active;
  }

  conditionStates(fields: Fields) {
    if ((this.waiting === -1) && (fields.getSignal(this.position.coordinates) >= 1)) {
        this.waiting = 0;
    }
    if (this.waiting != 0) {
      this.state = 'None';
    } else if (((this.active === 1) && (fields.getSignal(this.position.coordinates) >= 1)) ||
        ((this.active === -1) && (fields.getSignal(this.position.coordinates) === 0))) {
      this.state = 'Venus';
    } else {
      this.state = 'Mars';
    }
    if (this.waiting === 0){
        if ((this.loop === 0)) {
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
  }

  activeStates(fields: Fields) {
    if (this.state === 'Venus') {
      this.hasSolved = this.hasSolved && true;
    }
    if (this.state === 'Mars') {
      this.hasSolved = this.hasSolved && false;
    }
  }
}

export const createOutputArrow = (
  position: string,
  pattern: number[],
  cycling?: boolean,
  active?: number,
  waiting?: number,
) => new OutputArrow(position, pattern, cycling, active, waiting);
