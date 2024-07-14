import { Position } from './Position';
export type Direction = 'Up' | 'Left' | 'Down' | 'Right';

export class Fields {
  public signalField = new Map();
  public stateField = new Map();
  public arrowField = new Map();

  getSignal(key: Position) {
    if (!this.signalField.has(key.vector)) {
      return 0;
    }
    return this.signalField.get(key.vector);
  }

  getState(key: Position) {
    if (!this.stateField.has(key.vector)) {
      return;
    }
    return this.stateField.get(key.vector);
  }

  getArrow(key: Position) {
    if (!this.arrowField.has(key.vector)) {
      return;
    }
    return this.arrowField.get(key.vector);
  }

  addSignal(key: Position, signal: number) {
    const singalIn = this.signalField.get(key.vector);
    this.signalField.set(key.vector, signal + singalIn);
  }

  addState(key: Position, arrow: ArrowBase) {
    this.stateField.set(key.vector, arrow.state);
  }

  addArrow(key: Position, arrow: ArrowBase) {
    this.arrowField.set(key.vector, arrow);
  }
}

export const createFields = () => new Fields();

export class ArrowBase {
  public state = 'None';
  public signal = 0;

  constructor(
    private readonly position: Position,
    private direction: Direction,
    private readonly name: string,
  ) { }

  updateState(fields: Fields) {
    fields.addState(this.position, this);
  }

  conditionStates(fields: Fields) { }

  activeStates(fields: Fields) { }
}

export const createArrowBase = (
  position: Position,
  direction: Direction,
  name: string,
) => new ArrowBase(position, direction, name);
