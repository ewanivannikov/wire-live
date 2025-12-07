import { Fields } from './Base';
import { ArrowBase } from './ArrowBase';
import { createBinaryArray } from '../../shared/utils/createBinaryArray';
import { log } from 'console';

class OutputArrow extends ArrowBase {
  public index = 0;
  public binaryArray: number[];
  public isValidIn = false;
  private patternLength = 0;
  private cycleAmount = 0;
  private patternValidation: string[] = [];

  constructor(
    position: string,
    public pattern: number[],
    public cycling: boolean = false,
    public active: number = 1,
    public cycles: number = 1,
    public label: string = '',
  ) {
    super('OutputArrow', position);

    this.binaryArray = createBinaryArray(pattern || [1], this.active);
    this.patternLength = this.binaryArray.length;
    this.cycleAmount = this.cycles*this.binaryArray.length;
    
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
    let signal = fields.getSignal(this.position.coordinates);
    if (signal > 0) {
      signal = 1;
    }

    if (this.index < this.patternLength) {
      this.isValidIn = this.binaryArray[this.index] === signal;

      if (this.isValidIn) {
        this.index = this.index + 1;
      }
      else {this.index = 0;}
    }
    
    console.log(this.position, this.cycleAmount);
    
    this.cycleAmount = this.cycleAmount - 1;
    
    if (!this.isValidIn) {
      this.state = 'Wait';
    }
    if (this.isValidIn) {
      this.state = 'Correct';
      this.patternValidation.push(this.state);
    }
    if (!this.isValidIn) {
      this.state = 'Moon';
      this.patternValidation = [];
    }
    if (this.cycleAmount === 0) {
      this.state = 'Mistake';
      this.patternValidation.push(this.state);
    }
  }

  activeStates(fields: Fields) { }

  public get validated() {
    
    if (this.patternValidation.includes('Mistake')) return 'rejected';
    if (
      this.patternValidation.every((item) => item === 'Correct') &&
      this.patternValidation.length >= this.patternLength
    ) {
      this.cycleAmount = -1;
      return 'resolved';
    }
    return 'waiting';
  }

  public get completionPercentage() {
    return this.index/this.patternLength
  }
}

export const createOutputArrow = (
  position: string,
  pattern: number[],
  cycling?: boolean,
  active?: number,
  cycles?: number,
  label?: string,
) => new OutputArrow(position, pattern, cycling, active, cycles, label);
