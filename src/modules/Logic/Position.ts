export class Position {
  constructor(public coordinates: string) {}

  get vector() {
    const vector = this.coordinates.split(',').map(Number);
    return vector;
  }

  add(x: number, y: number) {
    const xOld = this.vector[0];
    const yOld = this.vector[1];
    const newCoordinates = `${xOld + x},${yOld + y}`;
    return new Position(newCoordinates);
  }
}

export const createPosition = (coordinates: string) =>
  new Position(coordinates);
