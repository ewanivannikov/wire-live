import { Fields } from './Base';
import { ArrowBase } from './ArrowBase';
import { makeAutoObservable } from 'mobx';

class OutputArrow extends ArrowBase {
  public index = -1;
  public loop = 0;
  public isValidIn = true;
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
    if ((this.waiting === -1) && (fields.getSignal(this.position.coordinates) >= 1)) {
        this.waiting = 0;
    }
    if (this.waiting != 0) {
      this.state = 'None';
    } else if (((this.active === 1) && (fields.getSignal(this.position.coordinates) >= 1)) ||
        ((this.active === -1) && (fields.getSignal(this.position.coordinates) === 0))) {
      this.isValid = this.isValid && true;
    } else {
      this.isValid = this.isValid && false;
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
    
    if (this.waiting != 0) {
      this.state = 'None';
    } else if (this.isValid) {
      this.state = 'Venus';
    } else {
      this.state = 'Mars';
    }
    
  }

  activeStates(fields: Fields) {
  }

  public get isValid() {
    return this.isValidIn && this.waiting === 0;
  }
}

export const createOutputArrow = (
  position: string,
  pattern: number[],
  cycling?: boolean,
  active?: number,
  waiting?: number,
) => new OutputArrow(position, pattern, cycling, active, waiting);
