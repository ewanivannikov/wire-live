import { patternArrowCache } from './patternArrowCache';

export const sources: { [key: string]: any } = {
  Sierpinski: [],
  DeMorgan: [...Object.values(patternArrowCache.DeMorgan)],
  TestLevel: [
    {
      tileId: 'Brush.22.',
      x: -1,
      y: -5,
    },
    {
      tileId: 'Brush.0.Up',
      x: -1,
      y: -4,
    },
    {
      tileId: 'Brush.0.Up',
      x: -1,
      y: -3,
    },
    {
      tileId: 'Brush.0.Up',
      x: -1,
      y: -2,
    },
    {
      tileId: 'Brush.21.Up',
      x: -1,
      y: -1,
    },
  ],
};
