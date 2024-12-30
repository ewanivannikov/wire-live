import { patternArrowCache } from './patternArrowCache';

export const sources: { [key: string]: any } = {
  Adder: [
    {
        "tileId": "Brush.15.Up",
        "x": 2,
        "y": 0
    },
    {
        "tileId": "Brush.0.Up",
        "x": 2,
        "y": 3
    },
    {
        "tileId": "Brush.0.Up",
        "x": 2,
        "y": 2
    },
    {
        "tileId": "Brush.6.Up.<",
        "x": 2,
        "y": 1
    },
    {
        "tileId": "Brush.0.Up",
        "x": 2,
        "y": -1
    },
    {
        "tileId": "Brush.0.Up",
        "x": 2,
        "y": -2
    },
    {
        "tileId": "Brush.0.Up",
        "x": 2,
        "y": -3
    },
    {
        "tileId": "Brush.0.Up",
        "x": 2,
        "y": -4
    },
    {
        "tileId": "Brush.0.Up",
        "x": -3,
        "y": 1
    },
    {
        "tileId": "Brush.6.Up.>",
        "x": -3,
        "y": 2
    },
    {
        "tileId": "Brush.0.Up",
        "x": -3,
        "y": 3
    },
    {
        "tileId": "Brush.0.Up",
        "x": -3,
        "y": -1
    },
    {
        "tileId": "Brush.0.Up",
        "x": -3,
        "y": -2
    },
    {
        "tileId": "Brush.0.Up",
        "x": -3,
        "y": -3
    },
    {
        "tileId": "Brush.0.Up",
        "x": -3,
        "y": -4
    },
    {
        "tileId": "Brush.16.Up",
        "x": -3,
        "y": 0
    },
    {
        "tileId": "Brush.10.Up.<",
        "x": -2,
        "y": 1
    },
    {
        "tileId": "Brush.0.Left",
        "x": -1,
        "y": 1
    },
    {
        "tileId": "Brush.0.Left",
        "x": 0,
        "y": 1
    },
    {
        "tileId": "Brush.0.Left",
        "x": 1,
        "y": 1
    },
    {
        "tileId": "Brush.0.Right",
        "x": 1,
        "y": 0
    },
    {
        "tileId": "Brush.9.Up",
        "x": 1,
        "y": 2
    },
    {
        "tileId": "Brush.0.Right",
        "x": -2,
        "y": 2
    },
    {
        "tileId": "Brush.0.Right",
        "x": -1,
        "y": 2
    },
    {
        "tileId": "Brush.0.Right",
        "x": 0,
        "y": 2
    }].concat([...Object.values(patternArrowCache.Adder)]),
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
