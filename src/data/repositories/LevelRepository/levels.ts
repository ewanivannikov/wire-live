import { sources } from './sources';

export const levels = {
  Sketch: {
    slug: 'Sketch',
    name: 'Sketch',
    description:
      '',
    map: sources.Sketch,
    allowedBrushList: [],
    requisites: {},
    optionalChallenges: {},
  },
  Briefing: {
    slug: 'Briefing',
    name: 'Инструктаж',
    description: '',
    map: sources.Briefing,
    allowedBrushList: [],
    requisites: {
      '1':{
        "6e6h3481iv": {
          pattern: [5,4,1],
          hasCycle: false,
          initialValue: 1,
          waiting: -1,
        },
        "337fhpqlvc": {
          pattern: [5,4,1],
          hasCycle: false,
          initialValue: 1,
          waiting: -1,
        },
        "66sg9if0ze": {
          pattern: [5,4,1],
          hasCycle: false,
          initialValue: 1,
        },
        "257yh28x22": {
          pattern: [5,4,1],
          hasCycle: false,
          initialValue: 1,
        }
    },
  },
    optionalChallenges: {},
  },
  Adder: {
    slug: 'Adder',
    name: 'Сумматор',
    description: 'Сумматор',
    map: sources.Adder,
    allowedBrushList: [],
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
          waiting: -1,
        },
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
          waiting: -1,
        },
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
          waiting: -1,
        },
      },
    },
    optionalChallenges: {},
  },
};
