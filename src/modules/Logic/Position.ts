export class Position {
  constructor(private coordinates: string) {
  }

  get vector() {
    const vector = this.coordinates.split(',').map(Number);
    return vector;
  }

  add(x: number, y: number) {
    const xOld = this.vector[0];
    const yOld = this.vector[1];
    this.coordinates = `${xOld + x},${yOld + y}`;
    return this.coordinates
  }
}

export const createPosition = (coordinates: string) => new Position(coordinates);
