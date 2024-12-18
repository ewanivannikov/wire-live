import { sources } from "./sources";

export const levels = {
  DeMorgan: {
    slug: 'DeMorgan',
    name: 'De Morgan',
    description: 'В одном из прошлых уровней Вы использовали новую стрелку "и" с двумя вводами. Ваша задачи вывести те же результаты, но не используя стрелку "и".',
    map: sources.DeMorgan,
    allowedBrushList: [
      'Brush.0.Up',
      'Brush.14.Up'
    ],
    requisites: {
      '1a5d944c-a2b2-437f-bdcf-bf5cb0ca2d4d': {
        'c71a8902-9ca6-4b57-b527-63f085599c8f': {
          pattern: [1, 2, 2],
          hasCycle: false,
          initialValue: 1,
        },
        '02263c8a-bc78-4210-834f-74967346401e': {
          pattern: [2, 1, 1],
          hasCycle: false,
          initialValue: 1,
        },
        '5a78b151-7bff-462d-8296-6a22f3cc7a36': {
          pattern: [2, 1, 2, 1],
          hasCycle: false,
          initialValue: 0,
          waiting: -1
        }
      },
      '4b9b6c1c-8bbe-4150-86c9-1ed98a446aa5': {
        'c71a8902-9ca6-4b57-b527-63f085599c8f': {
          pattern: [1, 2, 2],
          hasCycle: false,
          initialValue: 1,
        },
        '02263c8a-bc78-4210-834f-74967346401e': {
          pattern: [2, 1, 1],
          hasCycle: false,
          initialValue: 1,
        },
        '5a78b151-7bff-462d-8296-6a22f3cc7a36': {
          pattern: [2, 1, 2, 1],
          hasCycle: false,
          initialValue: 0,
          waiting: -1
        }
      },
      '2b5d944c-a2b2-437f-bdcf-bf5cb0ca2d5e': {
        'c71a8902-9ca6-4b57-b527-63f085599c8f': {
          pattern: [1, 2, 2],
          hasCycle: false,
          initialValue: 1,
        },
        '02263c8a-bc78-4210-834f-74967346401e': {
          pattern: [2, 1, 1],
          hasCycle: false,
          initialValue: 1,
        },
        '5a78b151-7bff-462d-8296-6a22f3cc7a36': {
          pattern: [2, 1, 2, 1],
          hasCycle: false,
          initialValue: 0,
          waiting: -1
        }
      },
    },
    optionalChallenges: {}
  },
  Sierpinski: {
    slug: 'Sierpinski',
    name: 'Серпинского',
    description: 'Серпинского треугольника',
    map: sources.Sierpinski,
    allowedBrushList: [],
  }
}
