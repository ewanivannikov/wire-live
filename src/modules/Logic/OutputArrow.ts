import { Fields } from './Base';
import { ArrowBase } from './ArrowBase';
import { createBinaryArray } from '../../shared/utils/createBinaryArray';

class OutputArrow extends ArrowBase {
  public index = 0;
  public binaryArray: number[];
  public isValidIn = false;
  private patternLength = 0;
  private patternValidation: string[] = [];

  constructor(
    position: string,
    public pattern: number[],
    public cycling: boolean = false,
    public active: number = 1,
    public label: string = '',
  ) {
    super('OutputArrow', position);

    this.binaryArray = createBinaryArray(pattern || [1], this.active);
    console.info('OutputArrowPattern:', this.binaryArray);
    console.info(
      `active:`,
      active,
      `pattern:`,
      pattern
    );
  }

  conditionStates = (fields: Fields) => {
    // ожидание истекло и сигнал достиг знака
    // if (
    //   this.waiting === -1 &&
    //   fields.getSignal(this.position.coordinates) === this.binaryArray[0]
    // ) {
    //   this.waiting = 0;
    // }

    // // не ждём, сразу проверяем
    // if (this.waiting === 0) {
    //   let valid

    //   if (this.index < this.binaryArray.length) {
    //     valid = this.binaryArray[this.index] === fields.getSignal(this.position.coordinates);
    //     this.index = this.index + 1;
    //   } else {
    //     if (this.cycling) {
    //       this.index = this.index % this.binaryArray.length;
    //       valid = this.binaryArray[this.index] === fields.getSignal(this.position.coordinates);
    //       this.index = this.index + 1;
    //     } else {
    //       valid = this.binaryArray[this.index - 1] === this.binaryArray.at(-1);
    //     }
    //   }


    //   this.isValidIn = this.isValidIn && valid;

    if (this.binaryArray[this.index] === fields.getSignal(this.position.coordinates)) {
        this.isValidIn = true;
        this.index = this.index + 1;
      }

    if (!this.isValidIn) {
      this.state = 'Wait';
    } else if (this.isValidIn) {
      this.state = 'Venus';
      this.patternValidation.push(this.state);
    } else if ((this.state === 'Venus') && !this.isValidIn) {
      this.state = 'Mars';
      this.patternValidation.clear();
      this.isValidIn = false;
      this.index = 0;
    }
  }

  activeStates(fields: Fields) { }

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
  label?: string,
) => new OutputArrow(position, pattern, cycling, active, label);
