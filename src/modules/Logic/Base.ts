type Position = [number, number];
type Direction = 'Up' | 'Left' | 'Down' | 'Right';

class Fields {
  public signalField = new Map();
  public stateField = new Map();
  public arrowField = new Map();

  getSignal(key: Position) {
    if (!this.signalField.has(key)) {
      return 0;
    }
    return this.signalField.get(key);
  }

  getState(key: Position) {
    if (!this.stateField.has(key)) {
      return;
    }
    return this.stateField.get(key);
  }

  getArrow(key: Position) {
    if (!this.arrowField.has(key)) {
      return;
    }
    return this.arrowField.get(key);
  }

  addSignal(key: Position, signal: number) {
    const singalIn = this.signalField.get(key);
    this.signalField.set(key, signal + singalIn);
  }

  addState(key: Position, arrow: Arrow) {
    this.stateField.set(key, arrow.state);
  }

  addArrow(key: Position, arrow: Arrow) {
    this.arrowField.set(key, arrow);
  }
}

export const createFields = () => new Fields();

class Arrow {
  public state = 'None';
  public signal = 0;

  constructor(
    private readonly position: Position,
    private direction: Direction,
    private readonly name: string,
  ) {}

  conditionStates(fields: Fields) {}

  activeStates(fields: Fields) {}
}

export const createArrow = (
  position: Position,
  direction: Direction,
  name: string,
) => new Arrow(position, direction, name);
