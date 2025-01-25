import { LevelDTO } from './dto';
import { sources } from './sources';

export const levels: Record<string, LevelDTO.Map> = {
  Briefing: {
    slug: 'Briefing',
    name: 'Хорошее начало',
    description: 'Нарисуйте прямую из знаков-стрелок, чтобы передать сигналы от ввода<svg height="24" width="24"><use href="./static/assets/glyphs-sprites.svg#Input" /></svg> к выводу<svg height="24" width="24"><use href="./static/assets/glyphs-sprites.svg#Output" /></svg>. Это будет хорошим началом для вас! \n\n Выберите слева-сверху знак "Стрелка" <svg height="24" width="24"><use href="./static/assets/glyphs-sprites.svg#Arrow" /></svg>. Чтобы проверить решение нажмите кнопку "Проверка" <svg height="24" width="24"><use href="./static/assets/glyphs-sprites-ui.svg#SendHorizontal" /></svg>. Для редактирования вашего решения нажмите кнопку "Решение".',
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
  Branching: {
    slug: 'Branching',
    name: 'Ветвление',
    description: 'Иногда один и тот же сигнал нужно передать в несколько разных мест. У вас появились новые стрелки! Они позволят вам распространить сигнал в нужные вам направления. Если вы захотите побльше почитать об этих знак или старых в выборе знаков нажмите на символ слева от знака, чтобы узнать о нём больше.',
    map: sources.Branching,
    allowedBrushList: [
      'Brush.0.Up',
      'Brush.5.Up',
      'Brush.6.Up.>',
      'Brush.7.Up'
    ],
    requisites: {
      '1' :{
        "0950md985m": {
        pattern: [2, 3, 1],
        hasCycle: false,
        initialValue: 1
      },
      "g69ph717e6": {
        pattern: [2, 3, 1],
        hasCycle: false,
        initialValue: 1,
        waiting: -1,
      },
      "9ifie7kio3": {
        pattern: [2, 3, 1],
        hasCycle: false,
        initialValue: 1,
        waiting: -1,
      },
      "80a9dh08b6": {
        pattern: [2, 3, 1],
        hasCycle: false,
        initialValue: 1,
        waiting: -1,
      },
      "b535lh2qye": {
        pattern: [2, 3, 1],
        hasCycle: false,
        initialValue: 1,
        waiting: -1,
      },
      "2ukcels09a": {
        pattern: [2, 3, 1],
        hasCycle: false,
        initialValue: 1,
        waiting: -1,
      }
    },
  },
    optionalChallenges: {},
  },
  Crossroads:{
    slug: 'Crossroads',
    name: 'Перекрёстки',
    description: 'Очень много вводов и выводов чьи сигналы не должны смешиваться. В ограниченом пространстве не получится просто пусть знаки в обход, что же делать? Новый знак: удлинитель <svg height="24" width="24"><use href="./static/assets/glyphs-sprites.svg#BlueArrow" /></svg> позволяет отправлять сигнал не на одну, а на две клетки вперёд от себя, это поможет вам провестики провода так, чтобы сигналы "прошли" друг через друга.',
    map: sources.Crossroads,
    allowedBrushList: [
      'Brush.0.Up',
      'Brush.9.Up',
    ],
    requisites: {
      '1' :{
        "5r73rp5hr3": {
          pattern: [4, 1, 2, 3, 1],
          hasCycle: false,
          initialValue: 1
        },
        "w478zd8f4p": {
          pattern: [2, 1, 4, 1, 3],
          hasCycle: false,
          initialValue: 1
        },
        "vyxd1w0jsn": {
          pattern: [3, 1, 1, 2, 4],
          hasCycle: false,
          initialValue: 1
        },
        "033504w030": {
          pattern: [4, 2, 1, 1, 3],
          hasCycle: false,
          initialValue: 1
        },
        "uqih90mf7x": {
          pattern: [3, 1, 1, 2, 4],
          hasCycle: false,
          initialValue: 1
        },
        "j7x29l731i": {
          pattern: [2, 1, 4, 1, 3],
          hasCycle: false,
          initialValue: 1
        },
        "xo83kxu9v5": {
          pattern: [4, 1, 2, 3, 1],
          hasCycle: false,
          initialValue: 1
        },
        "o59314wikt": {
          pattern: [4, 2, 1, 1, 3],
          hasCycle: false,
          initialValue: 1
        }
    },
  },
    optionalChallenges: {},
  },
  FineWork:{
    slug: 'FineWork',
    name: 'Тонкая работа',
    description: '',
    map: sources.FineWork,
    allowedBrushList: [
      'Brush.0.Up',
      'Brush.10.Up.>',
    ],
    requisites:{
      '1':{
        "4klv34s980": {
          pattern: [2, 1, 4, 1, 3],
          hasCycle: false,
          initialValue: 1,
          waiting: -1,
    },
    "z639x3r4do": {
      pattern: [2, 1, 4, 1, 3],
      hasCycle: false,
      initialValue: 1
    }}
    },
    optionalChallenges: {},
  },
  FineWorkII:{
    slug: 'FineWorkII',
    name: 'Тонкая работа 2',
    description: '',
    map: sources.FineWorkII,
    allowedBrushList: [
      'Brush.0.Up',
      'Brush.9.Up',
      'Brush.10.Up.>',
    ],
    requisites:{
      1:{"85y490zn3k": {
        pattern: [1, 2, 1, 4, 3],
      hasCycle: false,
      initialValue: 1,
      waiting: -1,
    },
    "4t5pj2sn4q": {
      pattern: [2, 4, 3, 1, 1],
      hasCycle: false,
      initialValue: 1,
      waiting: -1,
    },
    "b6j6a372a3": {
      pattern: [1, 4, 2, 3, 1],
      hasCycle: false,
      initialValue: 1,
      waiting: -1,
    },
    "o14hnqgp2q": {
      pattern: [2, 3, 4, 1, 1],
      hasCycle: false,
      initialValue: 1,
      waiting: -1,
    },
    "w19l8q5ay3": {
      pattern: [2, 1, 4, 1, 3],
      hasCycle: false,
      initialValue: 1,
      waiting: -1,
    },
    "46274ea348": {
      pattern: [2, 1, 4, 1, 3],
      hasCycle: false,
      initialValue: 1,
    },
    "6cn055602h": {
      pattern: [2, 3, 4, 1, 1],
      hasCycle: false,
      initialValue: 1,
    },
    "z6l5484m69": {
      pattern: [1, 4, 2, 3, 1],
      hasCycle: false,
      initialValue: 1,
    },
    "i75t655l6a": {
      pattern: [2, 4, 3, 1, 1],
      hasCycle: false,
      initialValue: 1,
    },
    "gv60hdb95i": {
      pattern: [1, 2, 1, 4, 3],
      hasCycle: false,
      initialValue: 1,
    }}
    },
    optionalChallenges: {},
  },
  CatchTheBus:{
    slug: 'CatchTheBus',
    name: 'Успеть на автобус',
    description: '',
    map: sources.CatchTheBus,
    allowedBrushList: [
      'Brush.0.Up',
      'Brush.5.Up',
      'Brush.6.Up.>',
      'Brush.7.Up',
      'Brush.9.Up',
      'Brush.10.Up.>',
    ],
    requisites:{},
    optionalChallenges: {},
  },
  OneWhole:{
    slug: 'OneWhole',
    name: 'Одно целое',
    description: 'Оба ввода дополняют друг друга, если бы можно было соединить оба потока, то вышел бы долгий непрерывный сигнал. Объедините сигналы с обоих вводов так, чтобы на вывод приходил один целый сигнал.',
    map: sources.OneWhole,
    allowedBrushList: [
      'Brush.0.Up',
      'Brush.5.Up',
      'Brush.6.Up.>',
    ],
    requisites:{
      '1':{
        "1wak460kj9": {
        "tileId": "Brush.22",
        "x": 0,
        "y": -2,
        "label": "A"
    },
    "56q4v7edsb": {
        "tileId": "Brush.21.Up",
        "x": -4,
        "y": 5,
        "label": "A"
    },
    "l4jyw0584q": {
        "tileId": "Brush.21.Up",
        "x": 0,
        "y": 5,
        "label": "A"
    }}
    },
    optionalChallenges: {},
  },
  OrOrOr:{
    slug: 'OrOrOr',
    name: 'Или, или, или',
    description: '',
    map: sources.OrOrOr,
    allowedBrushList: [
      'Brush.0.Up',
      'Brush.5.Up',
      'Brush.6.Up.>',
      'Brush.9.Up',
      'Brush.10.Up.>',
    ],
    requisites:{},
    optionalChallenges: {},
  },
  BrokenPass: {
    slug: 'BrokenPass',
    name: 'Сломанный пропуск',
    description: '',
    map: sources.BrokenPass,
    allowedBrushList: ['Brush.0.Up', 'Brush.15.Up','Brush.9.Up',
      'Brush.10.Up.>',],
    requisites: {
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
