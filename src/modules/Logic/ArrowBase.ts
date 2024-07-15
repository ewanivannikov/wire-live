import { Fields } from './Base';
import { createPosition, Position } from './Position';
import { Direction } from './types';

export abstract class ArrowBase {
  public state = 'None';
  public signal = 0;
  public position: Position;

  constructor(
    public readonly name: string,
    public readonly key: string,
    public direction?: Direction,
    public flip?: boolean
  ) {
    this.position = createPosition(key);
  }

  updateState(fields: Fields) {
    fields.addState(this.position.coordinates, this);
  }

  conditionStates(fields: Fields) { }

  activeStates(fields: Fields) { }
}
