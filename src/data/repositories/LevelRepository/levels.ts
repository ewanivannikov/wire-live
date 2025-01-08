import { sources } from './sources';

export const levels = {
  Briefing: {
    slug: 'Briefing',
    name: 'Хорошее начало',
    description: 'Нарисуйте прямую из знаков-стрелок, чтобы передать сигналы от ввода<svg height="24" width="24"><use href="./static/assets/glyphs-sprites.svg#Input" /></svg> к выводу<svg height="24" width="24"><use href="./static/assets/glyphs-sprites.svg#Output" /></svg>. Это будет хорошим началом для вас! \n\n Выберете слева-сверху знак "Стрелка" <svg height="24" width="24"><use href="./static/assets/glyphs-sprites.svg#Arrow" /></svg>. Чтобы проверить решение нажмите кнопку "Проверка". Для редактирования вашего решения нажмите кнопку "Решение".',
    map: sources.Briefing,
    allowedBrushList: ['Brush.0.Up'],
    requisites: {
      '1': {
        "6e6h3481iv": {
          pattern: [2, 2, 1],
          hasCycle: false,
          initialValue: 1,
          waiting: -1,
        },
        "337fhpqlvc": {
          pattern: [2, 2, 1],
          hasCycle: false,
          initialValue: 1,
          waiting: -1,
        },
        "66sg9if0ze": {
          pattern: [2, 2, 1],
          hasCycle: false,
          initialValue: 1,
        },
        "257yh28x22": {
          pattern: [2, 2, 1],
          hasCycle: false,
          initialValue: 1,
        }
      },
    },
    optionalChallenges: {},
  },
  BadTurn: {
    slug: 'BadTurn',
    name: 'Поворот не туда',
    description: 'Теперь до вывода по прямой не добраться. Нужно, чтобы стрелки отправяли сигналы в другую сторону на поворотах. Направление стрелки указывает, куда она отвравит сигнал в следующий ход. Проведите знаки, огибая повороты, и вновь доведите сигналы от вводa<svg height="24" width="24"><use href="./static/assets/glyphs-sprites.svg#Input" /></svg> к выводу<svg height="24" width="24"><use href="./static/assets/glyphs-sprites.svg#Output" /></svg>.\n\nЧтобы изменять направление стрелки, выберите его в левом верхним углу около выбора знака либо нажимай кнопку "R", чтобы поворачивать знак по часовой стрелке или против часовой, используя комбинацию "R"+"Shift".',
    map: sources.BadTurn,
    allowedBrushList: ['Brush.0.Up'],
    requisites: {
      '1': {
        "sr6a0e068q": {
          pattern: [2, 2, 1],
          hasCycle: false,
          initialValue: 1,
          waiting: -1,
        },
        "7khth75rce": {
          pattern: [2, 2, 1],
          hasCycle: false,
          initialValue: 1,
        },
      },
    },
    optionalChallenges: {},
  },
  Adder: {
    slug: 'Adder',
    name: 'Сумматор',
    description: 'Сумматор <svg height="24" width="24"><use href="./static/assets/glyphs-sprites.svg#Arrow" /></svg>',
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
