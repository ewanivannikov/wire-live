import { DirectionType, ToolType } from './enums';

export class Tile {
  constructor(private readonly name: string) { }

  get vector(): [ToolType, number | undefined, DirectionType | undefined, '>' | '<' | undefined] {
    return [ToolType.Brush, 1, DirectionType.Up, '>'].map((_, i) => {
      const chunks = this.name.split('.');
      if (i === 0) {
        return chunks[i];
      }
      if (i === 1) {
        return Number(chunks[i]);
      }
      return chunks[i];
    });
  }
}
