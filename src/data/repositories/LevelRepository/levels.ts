import { sources } from "./sources";

export const levels = {
  DeMorgan: {
    slug: 'DeMorgan',
    name: 'De Morgan',
    description: 'В одном из прошлых уровней Вы использовали новую стрелку "и" с двумя вводами. Ваша задачи вывести те же результаты, но не используя стрелку "и".',
    map: sources.DeMorgan,
    allowedBrushList: [
      'Brush.0.Up',
      'Brush.1'
    ],
    requisites: {
      'a': {
        'c71a8902-9ca6-4b57-b527-63f085599c8f': {
          pattern: [1, 1, 1],
          hasCycle: false,
          initialValue: 1,
        },
        '02263c8a-bc78-4210-834f-74967346401e': {
          pattern: [2, 2],
          hasCycle: false,
          initialValue: 0,
        },
        '5a78b151-7bff-462d-8296-6a22f3cc7a36': {
          pattern: [6, 1],
          hasCycle: false,
          initialValue: 0,
          waiting: -1
        }
      }
    }
  },
  Sierpinski: {
    slug: 'Sierpinski',
    name: 'Серпинского',
    description: 'Серпинского треугольника',
    map: sources.Sierpinski,
    allowedBrushList: [],
  }
}
