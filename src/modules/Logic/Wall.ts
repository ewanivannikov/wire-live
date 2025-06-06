import { Fields } from './Base';
import { ArrowBase } from './ArrowBase';
import { Direction } from './types';

class Wall extends ArrowBase {
  constructor(position: string, direction: Direction) {
    super('Wall', position, direction);
    this.state = 'Wall';
  }

  conditionStates(fields: Fields) {this.state = 'Wall'}
    
  activeStates(fields: Fields) {}
}

export const createWall = (position: string, direction: Direction) =>
  new Wall(position, direction);
