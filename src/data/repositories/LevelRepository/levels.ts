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
      "1": {
        "6e6h3481iv": {
          "pattern": [
            13,
            2,
            2,
            2,
            1
          ],
          "hasCycle": false,
          "initialValue": 1,
          "cycles": 3
        },
        "337fhpqlvc": {
          "pattern": [
            13,
            2,
            2,
            2,
            1
          ],
          "hasCycle": false,
          "initialValue": 1,
          "cycles": 3
        },
        "66sg9if0ze": {
          "pattern": [
            13,
            2,
            2,
            2,
            1
          ],
          "hasCycle": false,
          "initialValue": 1
        },
        "257yh28x22": {
          "pattern": [
            13,
            2,
            2,
            2,
            1
          ],
          "hasCycle": false,
          "initialValue": 1
        }
      },
      "2": {
        "6e6h3481iv": {
          "pattern": [
            6,
            6,
            2,
            1,
            2,
            2,
            1
          ],
          "hasCycle": false,
          "initialValue": 1,
          "cycles": 3
        },
        "337fhpqlvc": {
          "pattern": [
            6,
            6,
            2,
            1,
            2,
            2,
            1
          ],
          "hasCycle": false,
          "initialValue": 1,
          "cycles": 3
        },
        "66sg9if0ze": {
          "pattern": [
            6,
            6,
            2,
            1,
            2,
            2,
            1
          ],
          "hasCycle": false,
          "initialValue": 1
        },
        "257yh28x22": {
          "pattern": [
            6,
            6,
            2,
            1,
            2,
            2,
            1
          ],
          "hasCycle": false,
          "initialValue": 1
        }
      },
      "3": {
        "6e6h3481iv": {
          "pattern": [
            11,
            1,
            2,
            3,
            1,
            1,
            1
          ],
          "hasCycle": false,
          "initialValue": 1,
          "cycles": 3
        },
        "337fhpqlvc": {
          "pattern": [
            11,
            1,
            2,
            3,
            1,
            1,
            1
          ],
          "hasCycle": false,
          "initialValue": 1,
          "cycles": 3
        },
        "66sg9if0ze": {
          "pattern": [
            11,
            1,
            2,
            3,
            1,
            1,
            1
          ],
          "hasCycle": false,
          "initialValue": 1
        },
        "257yh28x22": {
          "pattern": [
            11,
            1,
            2,
            3,
            1,
            1,
            1
          ],
          "hasCycle": false,
          "initialValue": 1
        }
      },
      "4": {
        "6e6h3481iv": {
          "pattern": [
            13,
            1,
            3,
            2,
            1
          ],
          "hasCycle": false,
          "initialValue": 1,
          "cycles": 3
        },
        "337fhpqlvc": {
          "pattern": [
            13,
            1,
            3,
            2,
            1
          ],
          "hasCycle": false,
          "initialValue": 1,
          "cycles": 3
        },
        "66sg9if0ze": {
          "pattern": [
            13,
            1,
            3,
            2,
            1
          ],
          "hasCycle": false,
          "initialValue": 1
        },
        "257yh28x22": {
          "pattern": [
            13,
            1,
            3,
            2,
            1
          ],
          "hasCycle": false,
          "initialValue": 1
        }
      },
      "5": {
        "6e6h3481iv": {
          "pattern": [
            2,
            2,
            12,
            3,
            1
          ],
          "hasCycle": false,
          "initialValue": 1,
          "cycles": 3
        },
        "337fhpqlvc": {
          "pattern": [
            2,
            2,
            12,
            3,
            1
          ],
          "hasCycle": false,
          "initialValue": 1,
          "cycles": 3
        },
        "66sg9if0ze": {
          "pattern": [
            2,
            2,
            12,
            3,
            1
          ],
          "hasCycle": false,
          "initialValue": 1
        },
        "257yh28x22": {
          "pattern": [
            2,
            2,
            12,
            3,
            1
          ],
          "hasCycle": false,
          "initialValue": 1
        }
      }
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
      "1": {
        "7khth75rce": {
          "pattern": [
            9,
            1,
            5,
            4,
            1
          ],
          "hasCycle": false,
          "initialValue": 1
        },
        "sr6a0e068q": {
          "pattern": [
            9,
            1,
            5,
            4,
            1
          ],
          "hasCycle": false,
          "initialValue": 1,
          "cycles": 3
        }
      },
      "2": {
        "7khth75rce": {
          "pattern": [
            11,
            4,
            3,
            1,
            1
          ],
          "hasCycle": false,
          "initialValue": 1
        },
        "sr6a0e068q": {
          "pattern": [
            11,
            4,
            3,
            1,
            1
          ],
          "hasCycle": false,
          "initialValue": 1,
          "cycles": 3
        }
      },
      "3": {
        "7khth75rce": {
          "pattern": [
            5,
            10,
            3,
            1,
            1
          ],
          "hasCycle": false,
          "initialValue": 1
        },
        "sr6a0e068q": {
          "pattern": [
            5,
            10,
            3,
            1,
            1
          ],
          "hasCycle": false,
          "initialValue": 1,
          "cycles": 3
        }
      },
      "4": {
        "7khth75rce": {
          "pattern": [
            12,
            7,
            1
          ],
          "hasCycle": false,
          "initialValue": 1
        },
        "sr6a0e068q": {
          "pattern": [
            12,
            7,
            1
          ],
          "hasCycle": false,
          "initialValue": 1,
          "cycles": 3
        }
      },
      "5": {
        "7khth75rce": {
          "pattern": [
            7,
            5,
            1,
            3,
            2,
            1,
            1
          ],
          "hasCycle": false,
          "initialValue": 1
        },
        "sr6a0e068q": {
          "pattern": [
            7,
            5,
            1,
            3,
            2,
            1,
            1
          ],
          "hasCycle": false,
          "initialValue": 1,
          "cycles": 3
        }
      }
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
      "1": {
        "0950md985m": {
          "pattern": [
            2,
            10,
            4,
            3,
            1
          ],
          "hasCycle": false,
          "initialValue": 1
        },
        "g69ph717e6": {
          "pattern": [
            2,
            10,
            4,
            3,
            1
          ],
          "hasCycle": false,
          "initialValue": 1,
          "cycles": 3
        },
        "9ifie7kio3": {
          "pattern": [
            2,
            10,
            4,
            3,
            1
          ],
          "hasCycle": false,
          "initialValue": 1,
          "cycles": 3
        },
        "80a9dh08b6": {
          "pattern": [
            2,
            10,
            4,
            3,
            1
          ],
          "hasCycle": false,
          "initialValue": 1,
          "cycles": 3
        },
        "b535lh2qye": {
          "pattern": [
            2,
            10,
            4,
            3,
            1
          ],
          "hasCycle": false,
          "initialValue": 1,
          "cycles": 3
        },
        "2ukcels09a": {
          "pattern": [
            2,
            10,
            4,
            3,
            1
          ],
          "hasCycle": false,
          "initialValue": 1,
          "cycles": 3
        }
      },
      "2": {
        "0950md985m": {
          "pattern": [
            18,
            1,
            1
          ],
          "hasCycle": false,
          "initialValue": 1
        },
        "g69ph717e6": {
          "pattern": [
            18,
            1,
            1
          ],
          "hasCycle": false,
          "initialValue": 1,
          "cycles": 3
        },
        "9ifie7kio3": {
          "pattern": [
            18,
            1,
            1
          ],
          "hasCycle": false,
          "initialValue": 1,
          "cycles": 3
        },
        "80a9dh08b6": {
          "pattern": [
            18,
            1,
            1
          ],
          "hasCycle": false,
          "initialValue": 1,
          "cycles": 3
        },
        "b535lh2qye": {
          "pattern": [
            18,
            1,
            1
          ],
          "hasCycle": false,
          "initialValue": 1,
          "cycles": 3
        },
        "2ukcels09a": {
          "pattern": [
            18,
            1,
            1
          ],
          "hasCycle": false,
          "initialValue": 1,
          "cycles": 3
        }
      },
      "3": {
        "0950md985m": {
          "pattern": [
            3,
            12,
            1,
            3,
            1
          ],
          "hasCycle": false,
          "initialValue": 1
        },
        "g69ph717e6": {
          "pattern": [
            3,
            12,
            1,
            3,
            1
          ],
          "hasCycle": false,
          "initialValue": 1,
          "cycles": 3
        },
        "9ifie7kio3": {
          "pattern": [
            3,
            12,
            1,
            3,
            1
          ],
          "hasCycle": false,
          "initialValue": 1,
          "cycles": 3
        },
        "80a9dh08b6": {
          "pattern": [
            3,
            12,
            1,
            3,
            1
          ],
          "hasCycle": false,
          "initialValue": 1,
          "cycles": 3
        },
        "b535lh2qye": {
          "pattern": [
            3,
            12,
            1,
            3,
            1
          ],
          "hasCycle": false,
          "initialValue": 1,
          "cycles": 3
        },
        "2ukcels09a": {
          "pattern": [
            3,
            12,
            1,
            3,
            1
          ],
          "hasCycle": false,
          "initialValue": 1,
          "cycles": 3
        }
      },
      "4": {
        "0950md985m": {
          "pattern": [
            11,
            2,
            5,
            1,
            1
          ],
          "hasCycle": false,
          "initialValue": 1
        },
        "g69ph717e6": {
          "pattern": [
            11,
            2,
            5,
            1,
            1
          ],
          "hasCycle": false,
          "initialValue": 1,
          "cycles": 3
        },
        "9ifie7kio3": {
          "pattern": [
            11,
            2,
            5,
            1,
            1
          ],
          "hasCycle": false,
          "initialValue": 1,
          "cycles": 3
        },
        "80a9dh08b6": {
          "pattern": [
            11,
            2,
            5,
            1,
            1
          ],
          "hasCycle": false,
          "initialValue": 1,
          "cycles": 3
        },
        "b535lh2qye": {
          "pattern": [
            11,
            2,
            5,
            1,
            1
          ],
          "hasCycle": false,
          "initialValue": 1,
          "cycles": 3
        },
        "2ukcels09a": {
          "pattern": [
            11,
            2,
            5,
            1,
            1
          ],
          "hasCycle": false,
          "initialValue": 1,
          "cycles": 3
        }
      },
      "5": {
        "0950md985m": {
          "pattern": [
            14,
            3,
            1,
            1,
            1
          ],
          "hasCycle": false,
          "initialValue": 1
        },
        "g69ph717e6": {
          "pattern": [
            14,
            3,
            1,
            1,
            1
          ],
          "hasCycle": false,
          "initialValue": 1,
          "cycles": 3
        },
        "9ifie7kio3": {
          "pattern": [
            14,
            3,
            1,
            1,
            1
          ],
          "hasCycle": false,
          "initialValue": 1,
          "cycles": 3
        },
        "80a9dh08b6": {
          "pattern": [
            14,
            3,
            1,
            1,
            1
          ],
          "hasCycle": false,
          "initialValue": 1,
          "cycles": 3
        },
        "b535lh2qye": {
          "pattern": [
            14,
            3,
            1,
            1,
            1
          ],
          "hasCycle": false,
          "initialValue": 1,
          "cycles": 3
        },
        "2ukcels09a": {
          "pattern": [
            14,
            3,
            1,
            1,
            1
          ],
          "hasCycle": false,
          "initialValue": 1,
          "cycles": 3
        }
      }
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
      "1": {
        "5r73rp5hr3": {
          "pattern": [
            4,
            10,
            3,
            2,
            1
          ],
          "hasCycle": false,
          "initialValue": 1
        },
        "w478zd8f4p": {
          "pattern": [
            12,
            7,
            1
          ],
          "hasCycle": false,
          "initialValue": 1
        },
        "vyxd1w0jsn": {
          "pattern": [
            2,
            14,
            2,
            1,
            1
          ],
          "hasCycle": false,
          "initialValue": 1
        },
        "033504w030": {
          "pattern": [
            8,
            11,
            1
          ],
          "hasCycle": false,
          "initialValue": 1,
          "cycles": 3
        },
        "uqih90mf7x": {
          "pattern": [
            2,
            14,
            2,
            1,
            1
          ],
          "hasCycle": false,
          "initialValue": 1,
          "cycles": 3
        },
        "j7x29l731i": {
          "pattern": [
            12,
            7,
            1
          ],
          "hasCycle": false,
          "initialValue": 1,
          "cycles": 3
        },
        "xo83kxu9v5": {
          "pattern": [
            4,
            10,
            3,
            2,
            1
          ],
          "hasCycle": false,
          "initialValue": 1,
          "cycles": 3
        },
        "o59314wikt": {
          "pattern": [
            8,
            11,
            1
          ],
          "hasCycle": false,
          "initialValue": 1
        }
      },
      "2": {
        "5r73rp5hr3": {
          "pattern": [
            11,
            6,
            1,
            1,
            1
          ],
          "hasCycle": false,
          "initialValue": 1
        },
        "w478zd8f4p": {
          "pattern": [
            2,
            2,
            1,
            11,
            2,
            1,
            1
          ],
          "hasCycle": false,
          "initialValue": 1
        },
        "vyxd1w0jsn": {
          "pattern": [
            6,
            5,
            7,
            1,
            1
          ],
          "hasCycle": false,
          "initialValue": 1
        },
        "033504w030": {
          "pattern": [
            16,
            3,
            1
          ],
          "hasCycle": false,
          "initialValue": 1,
          "cycles": 3
        },
        "uqih90mf7x": {
          "pattern": [
            6,
            5,
            7,
            1,
            1
          ],
          "hasCycle": false,
          "initialValue": 1,
          "cycles": 3
        },
        "j7x29l731i": {
          "pattern": [
            2,
            2,
            1,
            11,
            2,
            1,
            1
          ],
          "hasCycle": false,
          "initialValue": 1,
          "cycles": 3
        },
        "xo83kxu9v5": {
          "pattern": [
            11,
            6,
            1,
            1,
            1
          ],
          "hasCycle": false,
          "initialValue": 1,
          "cycles": 3
        },
        "o59314wikt": {
          "pattern": [
            16,
            3,
            1
          ],
          "hasCycle": false,
          "initialValue": 1
        }
      },
      "3": {
        "5r73rp5hr3": {
          "pattern": [
            6,
            2,
            2,
            9,
            1
          ],
          "hasCycle": false,
          "initialValue": 1
        },
        "w478zd8f4p": {
          "pattern": [
            16,
            1,
            1,
            1,
            1
          ],
          "hasCycle": false,
          "initialValue": 1
        },
        "vyxd1w0jsn": {
          "pattern": [
            4,
            4,
            2,
            3,
            1,
            5,
            1
          ],
          "hasCycle": false,
          "initialValue": 1
        },
        "033504w030": {
          "pattern": [
            14,
            5,
            1
          ],
          "hasCycle": false,
          "initialValue": 1,
          "cycles": 3
        },
        "uqih90mf7x": {
          "pattern": [
            4,
            4,
            2,
            3,
            1,
            5,
            1
          ],
          "hasCycle": false,
          "initialValue": 1,
          "cycles": 3
        },
        "j7x29l731i": {
          "pattern": [
            16,
            1,
            1,
            1,
            1
          ],
          "hasCycle": false,
          "initialValue": 1,
          "cycles": 3
        },
        "xo83kxu9v5": {
          "pattern": [
            6,
            2,
            2,
            9,
            1
          ],
          "hasCycle": false,
          "initialValue": 1,
          "cycles": 3
        },
        "o59314wikt": {
          "pattern": [
            14,
            5,
            1
          ],
          "hasCycle": false,
          "initialValue": 1
        }
      },
      "4": {
        "5r73rp5hr3": {
          "pattern": [
            2,
            3,
            11,
            3,
            1
          ],
          "hasCycle": false,
          "initialValue": 1
        },
        "w478zd8f4p": {
          "pattern": [
            8,
            8,
            2,
            1,
            1
          ],
          "hasCycle": false,
          "initialValue": 1
        },
        "vyxd1w0jsn": {
          "pattern": [
            14,
            1,
            2,
            2,
            1
          ],
          "hasCycle": false,
          "initialValue": 1
        },
        "033504w030": {
          "pattern": [
            7,
            4,
            7,
            1,
            1
          ],
          "hasCycle": false,
          "initialValue": 1,
          "cycles": 3
        },
        "uqih90mf7x": {
          "pattern": [
            14,
            1,
            2,
            2,
            1
          ],
          "hasCycle": false,
          "initialValue": 1,
          "cycles": 3
        },
        "j7x29l731i": {
          "pattern": [
            8,
            8,
            2,
            1,
            1
          ],
          "hasCycle": false,
          "initialValue": 1,
          "cycles": 3
        },
        "xo83kxu9v5": {
          "pattern": [
            2,
            3,
            11,
            3,
            1
          ],
          "hasCycle": false,
          "initialValue": 1,
          "cycles": 3
        },
        "o59314wikt": {
          "pattern": [
            7,
            4,
            7,
            1,
            1
          ],
          "hasCycle": false,
          "initialValue": 1
        }
      }
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
      "1": {
        "4klv34s980": {
          "pattern": [
            4,
            5,
            8,
            2,
            1
          ],
          "hasCycle": false,
          "initialValue": 1,
          "cycles": 3
        },
        "z639x3r4do": {
          "pattern": [
            4,
            5,
            8,
            2,
            1
          ],
          "hasCycle": false,
          "initialValue": 1
        }
      },
      "2": {
        "4klv34s980": {
          "pattern": [
            16,
            3,
            1
          ],
          "hasCycle": false,
          "initialValue": 1,
          "cycles": 3
        },
        "z639x3r4do": {
          "pattern": [
            16,
            3,
            1
          ],
          "hasCycle": false,
          "initialValue": 1
        }
      },
      "3": {
        "4klv34s980": {
          "pattern": [
            14,
            2,
            2,
            1,
            1
          ],
          "hasCycle": false,
          "initialValue": 1,
          "cycles": 3
        },
        "z639x3r4do": {
          "pattern": [
            14,
            2,
            2,
            1,
            1
          ],
          "hasCycle": false,
          "initialValue": 1
        }
      },
      "4": {
        "4klv34s980": {
          "pattern": [
            6,
            5,
            7,
            1,
            1
          ],
          "hasCycle": false,
          "initialValue": 1,
          "cycles": 3
        },
        "z639x3r4do": {
          "pattern": [
            6,
            5,
            7,
            1,
            1
          ],
          "hasCycle": false,
          "initialValue": 1
        }
      },
      "5": {
        "4klv34s980": {
          "pattern": [
            12,
            7,
            1
          ],
          "hasCycle": false,
          "initialValue": 1,
          "cycles": 3
        },
        "z639x3r4do": {
          "pattern": [
            12,
            7,
            1
          ],
          "hasCycle": false,
          "initialValue": 1
        }
      }
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
      "1": {
        "85y490zn3k": {
          "pattern": [
            18,
            1,
            1
          ],
          "hasCycle": false,
          "initialValue": 1,
          "cycles": 3
        },
        "4t5pj2sn4q": {
          "pattern": [
            5,
            8,
            3,
            3,
            1
          ],
          "hasCycle": false,
          "initialValue": 1,
          "cycles": 3
        },
        "b6j6a372a3": {
          "pattern": [
            15,
            4,
            1
          ],
          "hasCycle": false,
          "initialValue": 1,
          "cycles": 3
        },
        "o14hnqgp2q": {
          "pattern": [
            8,
            8,
            2,
            1,
            1
          ],
          "hasCycle": false,
          "initialValue": 1,
          "cycles": 3
        },
        "w19l8q5ay3": {
          "pattern": [
            17,
            2,
            1
          ],
          "hasCycle": false,
          "initialValue": 1,
          "cycles": 3
        },
        "46274ea348": {
          "pattern": [
            17,
            2,
            1
          ],
          "hasCycle": false,
          "initialValue": 1
        },
        "6cn055602h": {
          "pattern": [
            8,
            8,
            2,
            1,
            1
          ],
          "hasCycle": false,
          "initialValue": 1
        },
        "z6l5484m69": {
          "pattern": [
            15,
            4,
            1
          ],
          "hasCycle": false,
          "initialValue": 1
        },
        "i75t655l6a": {
          "pattern": [
            5,
            8,
            3,
            3,
            1
          ],
          "hasCycle": false,
          "initialValue": 1
        },
        "gv60hdb95i": {
          "pattern": [
            18,
            1,
            1
          ],
          "hasCycle": false,
          "initialValue": 1
        }
      },
      "2": {
        "85y490zn3k": {
          "pattern": [
            1,
            18,
            1
          ],
          "hasCycle": false,
          "initialValue": 1,
          "cycles": 3
        },
        "4t5pj2sn4q": {
          "pattern": [
            3,
            9,
            3,
            4,
            1
          ],
          "hasCycle": false,
          "initialValue": 1,
          "cycles": 3
        },
        "b6j6a372a3": {
          "pattern": [
            6,
            10,
            1,
            2,
            1
          ],
          "hasCycle": false,
          "initialValue": 1,
          "cycles": 3
        },
        "o14hnqgp2q": {
          "pattern": [
            5,
            10,
            2,
            2,
            1
          ],
          "hasCycle": false,
          "initialValue": 1,
          "cycles": 3
        },
        "w19l8q5ay3": {
          "pattern": [
            5,
            9,
            3,
            2,
            1
          ],
          "hasCycle": false,
          "initialValue": 1,
          "cycles": 3
        },
        "46274ea348": {
          "pattern": [
            5,
            9,
            3,
            2,
            1
          ],
          "hasCycle": false,
          "initialValue": 1
        },
        "6cn055602h": {
          "pattern": [
            5,
            10,
            2,
            2,
            1
          ],
          "hasCycle": false,
          "initialValue": 1
        },
        "z6l5484m69": {
          "pattern": [
            6,
            10,
            1,
            2,
            1
          ],
          "hasCycle": false,
          "initialValue": 1
        },
        "i75t655l6a": {
          "pattern": [
            3,
            9,
            3,
            4,
            1
          ],
          "hasCycle": false,
          "initialValue": 1
        },
        "gv60hdb95i": {
          "pattern": [
            1,
            18,
            1
          ],
          "hasCycle": false,
          "initialValue": 1
        }
      }
    },
    optionalChallenges: {},
  },
  // CatchTheBus:{
  //   slug: 'CatchTheBus',
  //   name: 'Успеть на автобус',
  //   description: '',
  //   map: sources.CatchTheBus,
  //   allowedBrushList: [
  //     'Brush.0.Up',
  //     'Brush.5.Up',
  //     'Brush.6.Up.>',
  //     'Brush.7.Up',
  //     'Brush.9.Up',
  //     'Brush.10.Up.>',
  //   ],
  //   requisites:{},
  //   optionalChallenges: {},
  // },
  Permutations:{
    slug: 'Permutations',
    name: 'Перестановки',
    description: '',
    map: sources.Permutations,
    allowedBrushList: [
      'Brush.0.Up',
      'Brush.5.Up',
      'Brush.6.Up.>',
      'Brush.7.Up',
      'Brush.9.Up',
      'Brush.10.Up.>',
    ],
    requisites:{
      "1": {
        "9z2pdt0br3": {
          "pattern": [
            9,
            3,
            6,
            1,
            1
          ],
          "hasCycle": false,
          "initialValue": 1
        },
        "6237rhg3wd": {
          "pattern": [
            4,
            8,
            2,
            2,
            2,
            1,
            1
          ],
          "hasCycle": false,
          "initialValue": 1
        },
        "qn1vdf31ce": {
          "pattern": [
            18,
            1,
            1
          ],
          "hasCycle": false,
          "initialValue": 1
        },
        "83s11y92oa": {
          "pattern": [
            1,
            8,
            1,
            7,
            1,
            1,
            1
          ],
          "hasCycle": false,
          "initialValue": 1
        },
        "4b6d64663v": {
          "pattern": [
            12,
            7,
            1
          ],
          "hasCycle": false,
          "initialValue": 1
        },
        "l5cp0879c3": {
          "pattern": [
            2,
            1,
            9,
            5,
            1,
            1,
            1
          ],
          "hasCycle": false,
          "initialValue": 1
        },
        "2k0hd84rkg": {
          "pattern": [
            4,
            1,
            8,
            6,
            1
          ],
          "hasCycle": false,
          "initialValue": 1
        },
        "dx9xuyvlut": {
          "pattern": [
            2,
            17,
            1
          ],
          "hasCycle": false,
          "initialValue": 1
        },
        "9u87dz425b": {
          "pattern": [
            10,
            1,
            2,
            2,
            2,
            2,
            1
          ],
          "hasCycle": false,
          "initialValue": 1
        },
        "gs66t665z0": {
          "pattern": [
            4,
            8,
            2,
            2,
            2,
            1,
            1
          ],
          "hasCycle": false,
          "initialValue": 1,
          "cycles": 3
        },
        "l4l6o4y61r": {
          "pattern": [
            9,
            3,
            6,
            1,
            1
          ],
          "hasCycle": false,
          "initialValue": 1,
          "cycles": 3
        },
        "60b9a7yj2g": {
          "pattern": [
            12,
            7,
            1
          ],
          "hasCycle": false,
          "initialValue": 1,
          "cycles": 3
        },
        "3n8j5512o7": {
          "pattern": [
            18,
            1,
            1
          ],
          "hasCycle": false,
          "initialValue": 1,
          "cycles": 3
        },
        "k04lw4915z": {
          "pattern": [
            1,
            8,
            1,
            7,
            1,
            1,
            1
          ],
          "hasCycle": false,
          "initialValue": 1,
          "cycles": 3
        },
        "339768gf74": {
          "pattern": [
            10,
            1,
            2,
            2,
            2,
            2,
            1
          ],
          "hasCycle": false,
          "initialValue": 1,
          "cycles": 3
        },
        "m1f1776n71": {
          "pattern": [
            2,
            1,
            9,
            5,
            1,
            1,
            1
          ],
          "hasCycle": false,
          "initialValue": 1,
          "cycles": 3
        },
        "8rr3e56qlf": {
          "pattern": [
            4,
            1,
            8,
            6,
            1
          ],
          "hasCycle": false,
          "initialValue": 1,
          "cycles": 3
        },
        "52ctr58dp6": {
          "pattern": [
            2,
            17,
            1
          ],
          "hasCycle": false,
          "initialValue": 1,
          "cycles": 3
        }
      },
      "2": {
        "9z2pdt0br3": {
          "pattern": [
            11,
            4,
            2,
            2,
            1
          ],
          "hasCycle": false,
          "initialValue": 1
        },
        "6237rhg3wd": {
          "pattern": [
            16,
            3,
            1
          ],
          "hasCycle": false,
          "initialValue": 1
        },
        "qn1vdf31ce": {
          "pattern": [
            17,
            2,
            1
          ],
          "hasCycle": false,
          "initialValue": 1
        },
        "83s11y92oa": {
          "pattern": [
            14,
            3,
            1,
            1,
            1
          ],
          "hasCycle": false,
          "initialValue": 1
        },
        "4b6d64663v": {
          "pattern": [
            1,
            3,
            11,
            2,
            1,
            1,
            1
          ],
          "hasCycle": false,
          "initialValue": 1
        },
        "l5cp0879c3": {
          "pattern": [
            10,
            5,
            2,
            2,
            1
          ],
          "hasCycle": false,
          "initialValue": 1
        },
        "2k0hd84rkg": {
          "pattern": [
            12,
            1,
            4,
            2,
            1
          ],
          "hasCycle": false,
          "initialValue": 1
        },
        "dx9xuyvlut": {
          "pattern": [
            10,
            1,
            4,
            1,
            1,
            2,
            1
          ],
          "hasCycle": false,
          "initialValue": 1
        },
        "9u87dz425b": {
          "pattern": [
            7,
            8,
            2,
            2,
            1
          ],
          "hasCycle": false,
          "initialValue": 1
        },
        "gs66t665z0": {
          "pattern": [
            16,
            3,
            1
          ],
          "hasCycle": false,
          "initialValue": 1,
          "cycles": 3
        },
        "l4l6o4y61r": {
          "pattern": [
            11,
            4,
            2,
            2,
            1
          ],
          "hasCycle": false,
          "initialValue": 1,
          "cycles": 3
        },
        "60b9a7yj2g": {
          "pattern": [
            1,
            3,
            11,
            2,
            1,
            1,
            1
          ],
          "hasCycle": false,
          "initialValue": 1,
          "cycles": 3
        },
        "3n8j5512o7": {
          "pattern": [
            17,
            2,
            1
          ],
          "hasCycle": false,
          "initialValue": 1,
          "cycles": 3
        },
        "k04lw4915z": {
          "pattern": [
            14,
            3,
            1,
            1,
            1
          ],
          "hasCycle": false,
          "initialValue": 1,
          "cycles": 3
        },
        "339768gf74": {
          "pattern": [
            7,
            8,
            2,
            2,
            1
          ],
          "hasCycle": false,
          "initialValue": 1,
          "cycles": 3
        },
        "m1f1776n71": {
          "pattern": [
            10,
            5,
            2,
            2,
            1
          ],
          "hasCycle": false,
          "initialValue": 1,
          "cycles": 3
        },
        "8rr3e56qlf": {
          "pattern": [
            12,
            1,
            4,
            2,
            1
          ],
          "hasCycle": false,
          "initialValue": 1,
          "cycles": 3
        },
        "52ctr58dp6": {
          "pattern": [
            10,
            1,
            4,
            1,
            1,
            2,
            1
          ],
          "hasCycle": false,
          "initialValue": 1,
          "cycles": 3
        }
      }
    },
    optionalChallenges: {},
  },
  Backwards:{
    slug: 'Backwards',
    name: 'Задом-наперёд',
    description: '',
    map: sources.Backwards,
    allowedBrushList: [
      'Brush.0.Up',
      'Brush.5.Up',
      'Brush.6.Up.>',
      'Brush.7.Up',
      'Brush.9.Up',
      'Brush.10.Up.>',
    ],
    requisites:{
      "1": {
        "6rk1deu4e0": {
          "pattern": [
            13,
            6,
            1
          ],
          "hasCycle": false,
          "initialValue": 1
        },
        "70ppk8lgom": {
          "pattern": [
            9,
            10,
            1
          ],
          "hasCycle": false,
          "initialValue": 1
        },
        "7qd9q25s42": {
          "pattern": [
            9,
            8,
            1,
            1,
            1
          ],
          "hasCycle": false,
          "initialValue": 1
        },
        "979s21lf9c": {
          "pattern": [
            6,
            6,
            4,
            3,
            1
          ],
          "hasCycle": false,
          "initialValue": 1
        },
        "3ghz7pco81": {
          "pattern": [
            2,
            3,
            7,
            5,
            1,
            1,
            1
          ],
          "hasCycle": false,
          "initialValue": 1
        },
        "c6se2217h5": {
          "pattern": [
            5,
            9,
            4,
            1,
            1
          ],
          "hasCycle": false,
          "initialValue": 1
        },
        "j3453ke3i7": {
          "pattern": [
            15,
            1,
            1,
            2,
            1
          ],
          "hasCycle": false,
          "initialValue": 1
        },
        "kmf7ggj17g": {
          "pattern": [
            7,
            2,
            4,
            1,
            4,
            1,
            1
          ],
          "hasCycle": false,
          "initialValue": 1
        },
        "njlkqi4486": {
          "pattern": [
            13,
            6,
            1
          ],
          "hasCycle": false,
          "initialValue": 1,
          "cycles": 3
        },
        "884dl4fq99": {
          "pattern": [
            9,
            10,
            1
          ],
          "hasCycle": false,
          "initialValue": 1,
          "cycles": 3
        },
        "3hop473464": {
          "pattern": [
            9,
            8,
            1,
            1,
            1
          ],
          "hasCycle": false,
          "initialValue": 1,
          "cycles": 3
        },
        "klsf718ii6": {
          "pattern": [
            6,
            6,
            4,
            3,
            1
          ],
          "hasCycle": false,
          "initialValue": 1,
          "cycles": 3
        },
        "1odllb5972": {
          "pattern": [
            2,
            3,
            7,
            5,
            1,
            1,
            1
          ],
          "hasCycle": false,
          "initialValue": 1,
          "cycles": 3
        },
        "fql85ly999": {
          "pattern": [
            5,
            9,
            4,
            1,
            1
          ],
          "hasCycle": false,
          "initialValue": 1,
          "cycles": 3
        },
        "5o690z38q9": {
          "pattern": [
            15,
            1,
            1,
            2,
            1
          ],
          "hasCycle": false,
          "initialValue": 1,
          "cycles": 3
        },
        "i7lye84sqx": {
          "pattern": [
            7,
            2,
            4,
            1,
            4,
            1,
            1
          ],
          "hasCycle": false,
          "initialValue": 1,
          "cycles": 3
        }
      },
      "2": {
        "6rk1deu4e0": {
          "pattern": [
            3,
            5,
            7,
            4,
            1
          ],
          "hasCycle": false,
          "initialValue": 1
        },
        "70ppk8lgom": {
          "pattern": [
            17,
            2,
            1
          ],
          "hasCycle": false,
          "initialValue": 1
        },
        "7qd9q25s42": {
          "pattern": [
            6,
            8,
            4,
            1,
            1
          ],
          "hasCycle": false,
          "initialValue": 1
        },
        "979s21lf9c": {
          "pattern": [
            7,
            7,
            4,
            1,
            1
          ],
          "hasCycle": false,
          "initialValue": 1
        },
        "3ghz7pco81": {
          "pattern": [
            4,
            6,
            8,
            1,
            1
          ],
          "hasCycle": false,
          "initialValue": 1
        },
        "c6se2217h5": {
          "pattern": [
            8,
            3,
            7,
            1,
            1
          ],
          "hasCycle": false,
          "initialValue": 1
        },
        "j3453ke3i7": {
          "pattern": [
            8,
            5,
            5,
            1,
            1
          ],
          "hasCycle": false,
          "initialValue": 1
        },
        "kmf7ggj17g": {
          "pattern": [
            8,
            9,
            1,
            1,
            1
          ],
          "hasCycle": false,
          "initialValue": 1
        },
        "njlkqi4486": {
          "pattern": [
            3,
            5,
            7,
            4,
            1
          ],
          "hasCycle": false,
          "initialValue": 1,
          "cycles": 3
        },
        "884dl4fq99": {
          "pattern": [
            17,
            2,
            1
          ],
          "hasCycle": false,
          "initialValue": 1,
          "cycles": 3
        },
        "3hop473464": {
          "pattern": [
            6,
            8,
            4,
            1,
            1
          ],
          "hasCycle": false,
          "initialValue": 1,
          "cycles": 3
        },
        "klsf718ii6": {
          "pattern": [
            7,
            7,
            4,
            1,
            1
          ],
          "hasCycle": false,
          "initialValue": 1,
          "cycles": 3
        },
        "1odllb5972": {
          "pattern": [
            4,
            6,
            8,
            1,
            1
          ],
          "hasCycle": false,
          "initialValue": 1,
          "cycles": 3
        },
        "fql85ly999": {
          "pattern": [
            8,
            3,
            7,
            1,
            1
          ],
          "hasCycle": false,
          "initialValue": 1,
          "cycles": 3
        },
        "5o690z38q9": {
          "pattern": [
            8,
            5,
            5,
            1,
            1
          ],
          "hasCycle": false,
          "initialValue": 1,
          "cycles": 3
        },
        "i7lye84sqx": {
          "pattern": [
            8,
            9,
            1,
            1,
            1
          ],
          "hasCycle": false,
          "initialValue": 1,
          "cycles": 3
        }
      }
    },
    optionalChallenges: {},
  },
  OneWhole:{
    slug: 'OneWhole',
    name: 'Одно целое',
    description: 'Оба ввода дополняют друг друга, если бы можно было соединить оба потока, то вышел бы долгий непрерывный сигнал. Объедините сигналы с обоих вводов так, чтобы на вывод приходил один целый сигнал.',
    map: sources.OneWhole,
    allowedBrushList: [
      'Brush.0.Up',
      'Brush.9.Up',
      'Brush.10.Up.>',
    ],
    requisites:{
      "1": {
        "1wak460kj9": {
          "pattern": [
            20
          ],
          "hasCycle": false,
          "initialValue": 1,
          "cycles": 3
        },
        "56q4v7edsb": {
          "pattern": [
            1,
            6,
            11,
            1,
            1,
            1
          ],
          "hasCycle": false,
          "initialValue": 0
        },
        "l4jyw0584q": {
          "pattern": [
            1,
            6,
            11,
            1,
            1
          ],
          "hasCycle": false,
          "initialValue": 1
        }
      },
      "2": {
        "1wak460kj9": {
          "pattern": [
            20
          ],
          "hasCycle": false,
          "initialValue": 1,
          "cycles": 3
        },
        "56q4v7edsb": {
          "pattern": [
            1,
            3,
            11,
            1,
            2,
            1,
            1,
            1
          ],
          "hasCycle": false,
          "initialValue": 0
        },
        "l4jyw0584q": {
          "pattern": [
            1,
            3,
            11,
            1,
            2,
            1,
            1
          ],
          "hasCycle": false,
          "initialValue": 1
        }
      },
      "3": {
        "1wak460kj9": {
          "pattern": [
            20
          ],
          "hasCycle": false,
          "initialValue": 1,
          "cycles": 3
        },
        "56q4v7edsb": {
          "pattern": [
            7,
            4,
            3,
            5,
            1,
            1
          ],
          "hasCycle": false,
          "initialValue": 0
        },
        "l4jyw0584q": {
          "pattern": [
            7,
            4,
            3,
            5,
            1
          ],
          "hasCycle": false,
          "initialValue": 1
        }
      },
      "4": {
        "1wak460kj9": {
          "pattern": [
            20
          ],
          "hasCycle": false,
          "initialValue": 1,
          "cycles": 3
        },
        "56q4v7edsb": {
          "pattern": [
            3,
            2,
            5,
            2,
            5,
            2,
            1,
            1
          ],
          "hasCycle": false,
          "initialValue": 0
        },
        "l4jyw0584q": {
          "pattern": [
            3,
            2,
            5,
            2,
            5,
            2,
            1
          ],
          "hasCycle": false,
          "initialValue": 1
        }
      },
      "5": {
        "1wak460kj9": {
          "pattern": [
            20
          ],
          "hasCycle": false,
          "initialValue": 1,
          "cycles": 3
        },
        "56q4v7edsb": {
          "pattern": [
            14,
            5,
            1,
            1
          ],
          "hasCycle": false,
          "initialValue": 0
        },
        "l4jyw0584q": {
          "pattern": [
            14,
            5,
            1
          ],
          "hasCycle": false,
          "initialValue": 1
        }
      }
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
    requisites:{
      "1": {
        "oz232hni5d": {
          "pattern": [
            8,
            1,
            9,
            1,
            1
          ],
          "hasCycle": false,
          "initialValue": 1
        },
        "wa230tzqi0": {
          "pattern": [
            1,
            7,
            2,
            5,
            3,
            1,
            1
          ],
          "hasCycle": false,
          "initialValue": 1
        },
        "u82c5q5127": {
          "pattern": [
            11,
            1,
            3,
            4,
            1
          ],
          "hasCycle": false,
          "initialValue": 1
        },
        "j64d94zn7m": {
          "pattern": [
            18,
            1,
            1
          ],
          "hasCycle": false,
          "initialValue": 1,
          "cycles": 3
        },
        "600v4l312b": {
          "pattern": [
            18,
            1,
            1
          ],
          "hasCycle": false,
          "initialValue": 1,
          "cycles": 3
        },
        "ikdup875p3": {
          "pattern": [
            11,
            1,
            6,
            1,
            1
          ],
          "hasCycle": false,
          "initialValue": 1,
          "cycles": 3
        }
      },
      "2": {
        "oz232hni5d": {
          "pattern": [
            5,
            1,
            7,
            4,
            1,
            1,
            1
          ],
          "hasCycle": false,
          "initialValue": 1
        },
        "wa230tzqi0": {
          "pattern": [
            1,
            11,
            1,
            6,
            1
          ],
          "hasCycle": false,
          "initialValue": 1
        },
        "u82c5q5127": {
          "pattern": [
            8,
            5,
            2,
            1,
            2,
            1,
            1
          ],
          "hasCycle": false,
          "initialValue": 1
        },
        "j64d94zn7m": {
          "pattern": [
            5,
            1,
            7,
            4,
            1,
            1,
            1
          ],
          "hasCycle": false,
          "initialValue": 1,
          "cycles": 3
        },
        "600v4l312b": {
          "pattern": [
            15,
            1,
            2,
            1,
            1
          ],
          "hasCycle": false,
          "initialValue": 1,
          "cycles": 3
        },
        "ikdup875p3": {
          "pattern": [
            8,
            4,
            3,
            1,
            2,
            1,
            1
          ],
          "hasCycle": false,
          "initialValue": 1,
          "cycles": 3
        }
      },
      "3": {
        "oz232hni5d": {
          "pattern": [
            12,
            5,
            1,
            1,
            1
          ],
          "hasCycle": false,
          "initialValue": 1
        },
        "wa230tzqi0": {
          "pattern": [
            18,
            1,
            1
          ],
          "hasCycle": false,
          "initialValue": 1
        },
        "u82c5q5127": {
          "pattern": [
            3,
            1,
            6,
            9,
            1
          ],
          "hasCycle": false,
          "initialValue": 1
        },
        "j64d94zn7m": {
          "pattern": [
            18,
            1,
            1
          ],
          "hasCycle": false,
          "initialValue": 1,
          "cycles": 3
        },
        "600v4l312b": {
          "pattern": [
            12,
            5,
            1,
            1,
            1
          ],
          "hasCycle": false,
          "initialValue": 1,
          "cycles": 3
        },
        "ikdup875p3": {
          "pattern": [
            18,
            1,
            1
          ],
          "hasCycle": false,
          "initialValue": 1,
          "cycles": 3
        }
      }
    },
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
      "1": {
        "4k023vdc3l": {
          "pattern": [
            12,
            5,
            1,
            1,
            1
          ],
          "hasCycle": false,
          "initialValue": 1
        },
        "r4154jdx40": {
          "pattern": [
            2,
            14,
            2,
            1,
            1
          ],
          "hasCycle": false,
          "initialValue": 1
        },
        "z42cwg7o85": {
          "pattern": [
            2,
            14,
            2,
            1,
            1
          ],
          "hasCycle": false,
          "initialValue": 1
        },
        "iru5x27e23": {
          "pattern": [
            2,
            7,
            9,
            1,
            1
          ],
          "hasCycle": false,
          "initialValue": 1
        },
        "r156160668": {
          "pattern": [
            2,
            15,
            1,
            1,
            1
          ],
          "hasCycle": false,
          "initialValue": 1,
          "cycles": 3
        },
        "2z4ay9q05t": {
          "pattern": [
            2,
            14,
            2,
            1,
            1
          ],
          "hasCycle": false,
          "initialValue": 1,
          "cycles": 3
        }
      },
      "2": {
        "4k023vdc3l": {
          "pattern": [
            8,
            6,
            2,
            3,
            1
          ],
          "hasCycle": false,
          "initialValue": 1
        },
        "r4154jdx40": {
          "pattern": [
            7,
            4,
            5,
            1,
            1,
            1,
            1
          ],
          "hasCycle": false,
          "initialValue": 1
        },
        "z42cwg7o85": {
          "pattern": [
            7,
            4,
            5,
            1,
            1,
            1,
            1
          ],
          "hasCycle": false,
          "initialValue": 1
        },
        "iru5x27e23": {
          "pattern": [
            8,
            11,
            1
          ],
          "hasCycle": false,
          "initialValue": 1
        },
        "r156160668": {
          "pattern": [
            7,
            7,
            2,
            3,
            1
          ],
          "hasCycle": false,
          "initialValue": 1,
          "cycles": 3
        },
        "2z4ay9q05t": {
          "pattern": [
            7,
            12,
            1
          ],
          "hasCycle": false,
          "initialValue": 1,
          "cycles": 3
        }
      },
      "3": {
        "4k023vdc3l": {
          "pattern": [
            2,
            3,
            4,
            7,
            1,
            2,
            1
          ],
          "hasCycle": false,
          "initialValue": 1
        },
        "r4154jdx40": {
          "pattern": [
            3,
            14,
            1,
            1,
            1
          ],
          "hasCycle": false,
          "initialValue": 1
        },
        "z42cwg7o85": {
          "pattern": [
            3,
            14,
            1,
            1,
            1
          ],
          "hasCycle": false,
          "initialValue": 1
        },
        "iru5x27e23": {
          "pattern": [
            10,
            3,
            4,
            2,
            1
          ],
          "hasCycle": false,
          "initialValue": 1
        },
        "r156160668": {
          "pattern": [
            2,
            17,
            1
          ],
          "hasCycle": false,
          "initialValue": 1,
          "cycles": 3
        },
        "2z4ay9q05t": {
          "pattern": [
            3,
            16,
            1
          ],
          "hasCycle": false,
          "initialValue": 1,
          "cycles": 3
        }
      }
    },
    optionalChallenges: {},
  },
  AndAndAnd:{
    slug: 'AndAndAnd',
    name: 'И, и, и',
    description: '',
    map: sources.AndAndAnd,
    allowedBrushList: [
      'Brush.0.Up',
      'Brush.5.Up',
      'Brush.6.Up.>',
      'Brush.9.Up',
      'Brush.10.Up.>',
      'Brush.13.Up.>',
      'Brush.15.Up'
    ],
    requisites:{
      "1": {
        "oz332hni5d": {
          "pattern": [
            1,
            15,
            1,
            2,
            1
          ],
          "hasCycle": false,
          "initialValue": 1
        },
        "wa330tzqi0": {
          "pattern": [
            2,
            12,
            1,
            4,
            1
          ],
          "hasCycle": false,
          "initialValue": 1
        },
        "u83c5q5127": {
          "pattern": [
            11,
            8,
            1
          ],
          "hasCycle": false,
          "initialValue": 1
        },
        "j65d94zn7m": {
          "pattern": [
            1,
            18,
            1
          ],
          "hasCycle": false,
          "initialValue": 1,
          "cycles": 3
        },
        "601v4l312b": {
          "pattern": [
            1,
            18,
            1
          ],
          "hasCycle": false,
          "initialValue": 1,
          "cycles": 3
        },
        "ikeup875p3": {
          "pattern": [
            2,
            17,
            1
          ],
          "hasCycle": false,
          "initialValue": 1,
          "cycles": 3
        }
      },
      "2": {
        "oz332hni5d": {
          "pattern": [
            5,
            1,
            10,
            3,
            1
          ],
          "hasCycle": false,
          "initialValue": 1
        },
        "wa330tzqi0": {
          "pattern": [
            1,
            14,
            1,
            3,
            1
          ],
          "hasCycle": false,
          "initialValue": 1
        },
        "u83c5q5127": {
          "pattern": [
            13,
            6,
            1
          ],
          "hasCycle": false,
          "initialValue": 1
        },
        "j65d94zn7m": {
          "pattern": [
            1,
            14,
            1,
            3,
            1
          ],
          "hasCycle": false,
          "initialValue": 1,
          "cycles": 3
        },
        "601v4l312b": {
          "pattern": [
            5,
            1,
            7,
            6,
            1
          ],
          "hasCycle": false,
          "initialValue": 1,
          "cycles": 3
        },
        "ikeup875p3": {
          "pattern": [
            1,
            18,
            1
          ],
          "hasCycle": false,
          "initialValue": 1,
          "cycles": 3
        }
      },
      "3": {
        "oz332hni5d": {
          "pattern": [
            16,
            1,
            1,
            1,
            1
          ],
          "hasCycle": false,
          "initialValue": 1
        },
        "wa330tzqi0": {
          "pattern": [
            13,
            4,
            1,
            1,
            1
          ],
          "hasCycle": false,
          "initialValue": 1
        },
        "u83c5q5127": {
          "pattern": [
            7,
            7,
            4,
            1,
            1
          ],
          "hasCycle": false,
          "initialValue": 1
        },
        "j65d94zn7m": {
          "pattern": [
            13,
            4,
            1,
            1,
            1
          ],
          "hasCycle": false,
          "initialValue": 1,
          "cycles": 3
        },
        "601v4l312b": {
          "pattern": [
            7,
            7,
            2,
            1,
            1,
            1,
            1
          ],
          "hasCycle": false,
          "initialValue": 1,
          "cycles": 3
        },
        "ikeup875p3": {
          "pattern": [
            7,
            10,
            1,
            1,
            1
          ],
          "hasCycle": false,
          "initialValue": 1,
          "cycles": 3
        }
      }
    },
    optionalChallenges: {},
  },
  CableTwisting:{
    slug: 'CableTwisting',
    name: 'Скрутка кабелей',
    description: '',
    map: sources.CableTwisting,
    allowedBrushList: [
      'Brush.0.Up',
      'Brush.5.Up',
      'Brush.6.Up.>',
      'Brush.9.Up',
      'Brush.10.Up.>',
      'Brush.13.Up.>',
    ],
    requisites:{
      "1": {
        "954theke74": {
          "pattern": [
            6,
            11,
            1,
            1,
            1
          ],
          "hasCycle": false,
          "initialValue": 1
        },
        "23fl0ls329": {
          "pattern": [
            7,
            2,
            6,
            2,
            1,
            1,
            1
          ],
          "hasCycle": false,
          "initialValue": 1
        },
        "b3c2710136": {
          "pattern": [
            18,
            1,
            1
          ],
          "hasCycle": false,
          "initialValue": 1
        },
        "ul94057ty4": {
          "pattern": [
            13,
            2,
            1,
            3,
            1
          ],
          "hasCycle": false,
          "initialValue": 1
        },
        "58818gk23r": {
          "pattern": [
            7,
            2,
            8,
            2,
            1
          ],
          "hasCycle": false,
          "initialValue": 1
        },
        "3991n1obal": {
          "pattern": [
            3,
            1,
            8,
            7,
            1
          ],
          "hasCycle": false,
          "initialValue": 1
        },
        "6255584j52": {
          "pattern": [
            3,
            1,
            2,
            13,
            1
          ],
          "hasCycle": false,
          "initialValue": 1,
          "cycles": 3
        }
      },
      "2": {
        "954theke74": {
          "pattern": [
            6,
            3,
            1,
            2,
            1,
            2,
            3,
            1,
            1
          ],
          "hasCycle": false,
          "initialValue": 1
        },
        "23fl0ls329": {
          "pattern": [
            17,
            2,
            1
          ],
          "hasCycle": false,
          "initialValue": 1
        },
        "b3c2710136": {
          "pattern": [
            8,
            7,
            3,
            1,
            1
          ],
          "hasCycle": false,
          "initialValue": 1
        },
        "ul94057ty4": {
          "pattern": [
            12,
            1,
            5,
            1,
            1
          ],
          "hasCycle": false,
          "initialValue": 1
        },
        "58818gk23r": {
          "pattern": [
            11,
            1,
            1,
            2,
            2,
            2,
            1
          ],
          "hasCycle": false,
          "initialValue": 1
        },
        "3991n1obal": {
          "pattern": [
            7,
            2,
            6,
            2,
            1,
            1,
            1
          ],
          "hasCycle": false,
          "initialValue": 1
        },
        "6255584j52": {
          "pattern": [
            6,
            13,
            1
          ],
          "hasCycle": false,
          "initialValue": 1,
          "cycles": 3
        }
      },
      "3": {
        "954theke74": {
          "pattern": [
            1,
            2,
            8,
            2,
            2,
            1,
            2,
            1,
            1
          ],
          "hasCycle": false,
          "initialValue": 1
        },
        "23fl0ls329": {
          "pattern": [
            1,
            13,
            1,
            4,
            1
          ],
          "hasCycle": false,
          "initialValue": 1
        },
        "b3c2710136": {
          "pattern": [
            1,
            6,
            8,
            4,
            1
          ],
          "hasCycle": false,
          "initialValue": 1
        },
        "ul94057ty4": {
          "pattern": [
            18,
            1,
            1
          ],
          "hasCycle": false,
          "initialValue": 1
        },
        "58818gk23r": {
          "pattern": [
            3,
            6,
            2,
            2,
            2,
            2,
            1,
            1,
            1
          ],
          "hasCycle": false,
          "initialValue": 1
        },
        "3991n1obal": {
          "pattern": [
            6,
            1,
            6,
            6,
            1
          ],
          "hasCycle": false,
          "initialValue": 1
        },
        "6255584j52": {
          "pattern": [
            1,
            18,
            1
          ],
          "hasCycle": false,
          "initialValue": 1,
          "cycles": 3
        }
      }
    },
    optionalChallenges: {},
  },
  DifficultVoting:{
    slug: 'DifficultVoting',
    name: 'Сложное голосование',
    description: '',
    map: sources.DifficultVoting,
    allowedBrushList: [
      'Brush.0.Up',
      'Brush.5.Up',
      'Brush.6.Up.>',
      'Brush.9.Up',
      'Brush.10.Up.>',
      'Brush.15.Up'
    ],
    requisites:{
      "1": {
        "z6690l9s97": {
          "pattern": [
            13,
            2,
            3,
            1,
            1
          ],
          "hasCycle": false,
          "initialValue": 1
        },
        "mq50f92h9h": {
          "pattern": [
            6,
            13,
            1
          ],
          "hasCycle": false,
          "initialValue": 1
        },
        "m5rohe0j6t": {
          "pattern": [
            10,
            9,
            1
          ],
          "hasCycle": false,
          "initialValue": 1
        },
        "8ci0r0915s": {
          "pattern": [
            6,
            13,
            1
          ],
          "hasCycle": false,
          "initialValue": 1,
          "cycles": 3
        },
        "ep12r27dtp": {
          "pattern": [
            13,
            2,
            3,
            1,
            1
          ],
          "hasCycle": false,
          "initialValue": 1,
          "cycles": 3
        }
      },
      "2": {
        "z6690l9s97": {
          "pattern": [
            5,
            7,
            2,
            5,
            1
          ],
          "hasCycle": false,
          "initialValue": 1
        },
        "mq50f92h9h": {
          "pattern": [
            17,
            2,
            1
          ],
          "hasCycle": false,
          "initialValue": 1
        },
        "m5rohe0j6t": {
          "pattern": [
            10,
            1,
            1,
            3,
            3,
            1,
            1
          ],
          "hasCycle": false,
          "initialValue": 1
        },
        "8ci0r0915s": {
          "pattern": [
            5,
            14,
            1
          ],
          "hasCycle": false,
          "initialValue": 1,
          "cycles": 3
        },
        "ep12r27dtp": {
          "pattern": [
            18,
            1,
            1
          ],
          "hasCycle": false,
          "initialValue": 1,
          "cycles": 3
        }
      },
      "3": {
        "z6690l9s97": {
          "pattern": [
            9,
            8,
            1,
            1,
            1
          ],
          "hasCycle": false,
          "initialValue": 1
        },
        "mq50f92h9h": {
          "pattern": [
            8,
            4,
            4,
            3,
            1
          ],
          "hasCycle": false,
          "initialValue": 1
        },
        "m5rohe0j6t": {
          "pattern": [
            3,
            14,
            1,
            1,
            1
          ],
          "hasCycle": false,
          "initialValue": 1
        },
        "8ci0r0915s": {
          "pattern": [
            3,
            16,
            1
          ],
          "hasCycle": false,
          "initialValue": 1,
          "cycles": 3
        },
        "ep12r27dtp": {
          "pattern": [
            9,
            3,
            4,
            1,
            1,
            1,
            1
          ],
          "hasCycle": false,
          "initialValue": 1,
          "cycles": 3
        }
      }
    },
    optionalChallenges: {},
  },
  LogicalRevolution:{
    slug: 'LogicalRevolution',
    name: 'Логический переворот',
    description: '',
    map: sources.LogicalRevolution,
    allowedBrushList: [
      'Brush.0.Up',
      'Brush.14.Up'
    ],
    requisites:{
      "1": {
        "41bbs0k57x": {
          "pattern": [
            8,
            2,
            2,
            7,
            1
          ],
          "hasCycle": false,
          "initialValue": 1
        },
        "ej5692xl6n": {
          "pattern": [
            10,
            5,
            3,
            1,
            1
          ],
          "hasCycle": false,
          "initialValue": 1
        },
        "9dk35p28p7": {
          "pattern": [
            8,
            11,
            1
          ],
          "hasCycle": false,
          "initialValue": 1
        },
        "c00x7nxe87": {
          "pattern": [
            14,
            5,
            1
          ],
          "hasCycle": false,
          "initialValue": 1
        },
        "153wefs5ay": {
          "pattern": [
            2,
            2,
            7,
            1,
            8
          ],
          "hasCycle": false,
          "initialValue": 1,
          "cycles": 3
        },
        "rbqz09d2kw": {
          "pattern": [
            5,
            3,
            1,
            1,
            10
          ],
          "hasCycle": false,
          "initialValue": 1,
          "cycles": 3
        },
        "5wqfzkfay0": {
          "pattern": [
            11,
            1,
            8
          ],
          "hasCycle": false,
          "initialValue": 1,
          "cycles": 3
        },
        "813qr6w0gj": {
          "pattern": [
            5,
            1,
            14
          ],
          "hasCycle": false,
          "initialValue": 1,
          "cycles": 3
        }
      },
      "2": {
        "41bbs0k57x": {
          "pattern": [
            8,
            9,
            1,
            1,
            1
          ],
          "hasCycle": false,
          "initialValue": 1
        },
        "ej5692xl6n": {
          "pattern": [
            1,
            12,
            1,
            3,
            1,
            1,
            1
          ],
          "hasCycle": false,
          "initialValue": 1
        },
        "9dk35p28p7": {
          "pattern": [
            7,
            1,
            3,
            8,
            1
          ],
          "hasCycle": false,
          "initialValue": 1
        },
        "c00x7nxe87": {
          "pattern": [
            17,
            2,
            1
          ],
          "hasCycle": false,
          "initialValue": 1
        },
        "153wefs5ay": {
          "pattern": [
            9,
            1,
            1,
            1,
            8
          ],
          "hasCycle": false,
          "initialValue": 1,
          "cycles": 3
        },
        "rbqz09d2kw": {
          "pattern": [
            12,
            1,
            3,
            1,
            1,
            1,
            1
          ],
          "hasCycle": false,
          "initialValue": 1,
          "cycles": 3
        },
        "5wqfzkfay0": {
          "pattern": [
            1,
            3,
            8,
            1,
            7
          ],
          "hasCycle": false,
          "initialValue": 1,
          "cycles": 3
        },
        "813qr6w0gj": {
          "pattern": [
            2,
            1,
            17
          ],
          "hasCycle": false,
          "initialValue": 1,
          "cycles": 3
        }
      },
      "3": {
        "41bbs0k57x": {
          "pattern": [
            6,
            8,
            4,
            1,
            1
          ],
          "hasCycle": false,
          "initialValue": 1
        },
        "ej5692xl6n": {
          "pattern": [
            4,
            5,
            1,
            9,
            1
          ],
          "hasCycle": false,
          "initialValue": 1
        },
        "9dk35p28p7": {
          "pattern": [
            15,
            4,
            1
          ],
          "hasCycle": false,
          "initialValue": 1
        },
        "c00x7nxe87": {
          "pattern": [
            12,
            2,
            4,
            1,
            1
          ],
          "hasCycle": false,
          "initialValue": 1
        },
        "153wefs5ay": {
          "pattern": [
            8,
            4,
            1,
            1,
            6
          ],
          "hasCycle": false,
          "initialValue": 1,
          "cycles": 3
        },
        "rbqz09d2kw": {
          "pattern": [
            5,
            1,
            9,
            1,
            4
          ],
          "hasCycle": false,
          "initialValue": 1,
          "cycles": 3
        },
        "5wqfzkfay0": {
          "pattern": [
            4,
            1,
            15
          ],
          "hasCycle": false,
          "initialValue": 1,
          "cycles": 3
        },
        "813qr6w0gj": {
          "pattern": [
            2,
            4,
            1,
            1,
            12
          ],
          "hasCycle": false,
          "initialValue": 1,
          "cycles": 3
        }
      },
      "4": {
        "41bbs0k57x": {
          "pattern": [
            6,
            11,
            1,
            1,
            1
          ],
          "hasCycle": false,
          "initialValue": 1
        },
        "ej5692xl6n": {
          "pattern": [
            3,
            12,
            2,
            2,
            1
          ],
          "hasCycle": false,
          "initialValue": 1
        },
        "9dk35p28p7": {
          "pattern": [
            11,
            8,
            1
          ],
          "hasCycle": false,
          "initialValue": 1
        },
        "c00x7nxe87": {
          "pattern": [
            16,
            1,
            1,
            1,
            1
          ],
          "hasCycle": false,
          "initialValue": 1
        },
        "153wefs5ay": {
          "pattern": [
            11,
            1,
            1,
            1,
            6
          ],
          "hasCycle": false,
          "initialValue": 1,
          "cycles": 3
        },
        "rbqz09d2kw": {
          "pattern": [
            12,
            2,
            2,
            1,
            3
          ],
          "hasCycle": false,
          "initialValue": 1,
          "cycles": 3
        },
        "5wqfzkfay0": {
          "pattern": [
            8,
            1,
            11
          ],
          "hasCycle": false,
          "initialValue": 1,
          "cycles": 3
        },
        "813qr6w0gj": {
          "pattern": [
            1,
            1,
            1,
            1,
            16
          ],
          "hasCycle": false,
          "initialValue": 1,
          "cycles": 3
        }
      }
    },
    optionalChallenges: {},
  },
  FillTheGaps:{
    slug: 'FillTheGaps',
    name: 'Заполнить пропуски',
    description: '',
    map: sources.FillTheGaps,
    allowedBrushList: [
      'Brush.0.Up',
      'Brush.5.Up',
      'Brush.6.Up.>',
      'Brush.9.Up',
      'Brush.10.Up.>',
      'Brush.13.Up.>',
      'Brush.14.Up'
    ],
    requisites:{
      "1": {
        "9e3uq3597l": {
          "pattern": [
            6,
            2,
            9,
            2,
            1
          ],
          "hasCycle": false,
          "initialValue": 1
        },
        "5du448y38z": {
          "pattern": [
            20
          ],
          "hasCycle": false,
          "initialValue": 1,
          "cycles": 3
        }
      },
      "2": {
        "9e3uq3597l": {
          "pattern": [
            18,
            1,
            1
          ],
          "hasCycle": false,
          "initialValue": 1
        },
        "5du448y38z": {
          "pattern": [
            20
          ],
          "hasCycle": false,
          "initialValue": 1,
          "cycles": 3
        }
      },
      "3": {
        "9e3uq3597l": {
          "pattern": [
            2,
            8,
            4,
            3,
            1,
            1,
            1
          ],
          "hasCycle": false,
          "initialValue": 1
        },
        "5du448y38z": {
          "pattern": [
            20
          ],
          "hasCycle": false,
          "initialValue": 1,
          "cycles": 3
        }
      },
      "4": {
        "9e3uq3597l": {
          "pattern": [
            3,
            14,
            1,
            1,
            1
          ],
          "hasCycle": false,
          "initialValue": 1
        },
        "5du448y38z": {
          "pattern": [
            20
          ],
          "hasCycle": false,
          "initialValue": 1,
          "cycles": 3
        }
      },
      "5": {
        "9e3uq3597l": {
          "pattern": [
            15,
            2,
            1,
            1,
            1
          ],
          "hasCycle": false,
          "initialValue": 1
        },
        "5du448y38z": {
          "pattern": [
            20
          ],
          "hasCycle": false,
          "initialValue": 1,
          "cycles": 3
        }
      }
    },
    optionalChallenges: {},
  },
  TemporaryNetworkShutdown:{
    slug: 'TemporaryNetworkShutdown',
    name: 'Временное отключение сети',
    description: '',
    map: sources.TemporaryNetworkShutdown,
    allowedBrushList: [
      'Brush.0.Up',
      'Brush.5.Up',
      'Brush.6.Up.>',
      'Brush.9.Up',
      'Brush.10.Up.>',
      'Brush.13.Up.>',
      'Brush.14.Up',
      'Brush.15.Up'
    ],
    requisites:{
      "1": {
        "0e3uq3597l": {
          "pattern": [
            4,
            9,
            5,
            1,
            1
          ],
          "hasCycle": false,
          "initialValue": 1
        },
        "6du448y38z": {
          "pattern": [
            20
          ],
          "hasCycle": false,
          "initialValue": 0,
          "cycles": 3
        }
      },
      "2": {
        "0e3uq3597l": {
          "pattern": [
            13,
            6,
            1
          ],
          "hasCycle": false,
          "initialValue": 1
        },
        "6du448y38z": {
          "pattern": [
            20
          ],
          "hasCycle": false,
          "initialValue": 0,
          "cycles": 3
        }
      },
      "3": {
        "0e3uq3597l": {
          "pattern": [
            7,
            7,
            4,
            1,
            1
          ],
          "hasCycle": false,
          "initialValue": 1
        },
        "6du448y38z": {
          "pattern": [
            20
          ],
          "hasCycle": false,
          "initialValue": 0,
          "cycles": 3
        }
      },
      "4": {
        "0e3uq3597l": {
          "pattern": [
            7,
            5,
            6,
            1,
            1
          ],
          "hasCycle": false,
          "initialValue": 1
        },
        "6du448y38z": {
          "pattern": [
            20
          ],
          "hasCycle": false,
          "initialValue": 0,
          "cycles": 3
        }
      },
      "5": {
        "0e3uq3597l": {
          "pattern": [
            6,
            7,
            5,
            1,
            1
          ],
          "hasCycle": false,
          "initialValue": 1
        },
        "6du448y38z": {
          "pattern": [
            20
          ],
          "hasCycle": false,
          "initialValue": 0,
          "cycles": 3
        }
      }
    },
    optionalChallenges: {},
  },
  ExclusionRoom:{
    slug: 'ExclusionRoom',
    name: 'Исключающая комната',
    description: '',
    map: sources.ExclusionRoom,
    allowedBrushList: [
      'Brush.0.Up',
      'Brush.5.Up',
      'Brush.6.Up.>',
      'Brush.9.Up',
      'Brush.10.Up.>',
      'Brush.13.Up.>',
      'Brush.15.Up',
      'Brush.14.Up'
    ],
    requisites:{
      "1": {
        "bc19z64871": {
          "pattern": [
            1,
            16,
            1,
            1,
            1
          ],
          "hasCycle": false,
          "initialValue": 1
        },
        "2278129h8g": {
          "pattern": [
            4,
            7,
            5,
            3,
            1
          ],
          "hasCycle": false,
          "initialValue": 1
        },
        "7lw8v665fm": {
          "pattern": [
            3,
            7,
            5,
            1,
            1,
            2
          ],
          "hasCycle": false,
          "initialValue": 1,
          "cycles": 3
        }
      },
      "2": {
        "bc19z64871": {
          "pattern": [
            17,
            2,
            1
          ],
          "hasCycle": false,
          "initialValue": 1
        },
        "2278129h8g": {
          "pattern": [
            6,
            2,
            10,
            1,
            1
          ],
          "hasCycle": false,
          "initialValue": 1
        },
        "7lw8v665fm": {
          "pattern": [
            2,
            9,
            1,
            2
          ],
          "hasCycle": false,
          "initialValue": 1,
          "cycles": 3
        }
      },
      "3": {
        "bc19z64871": {
          "pattern": [
            6,
            5,
            7,
            1,
            1
          ],
          "hasCycle": false,
          "initialValue": 1
        },
        "2278129h8g": {
          "pattern": [
            15,
            2,
            1,
            1,
            1
          ],
          "hasCycle": false,
          "initialValue": 1
        },
        "7lw8v665fm": {
          "pattern": [
            5,
            4,
            2,
            3
          ],
          "hasCycle": false,
          "initialValue": 1,
          "cycles": 3
        }
      }
    },
    optionalChallenges: {},
  },
  ExclusionRoomII:{
    slug: 'ExclusionRoomII',
    name: 'Исключающая комната 2',
    description: '',
    map: sources.ExclusionRoomII,
    allowedBrushList: [
      'Brush.0.Up',
      'Brush.9.Up',
      'Brush.10.Up.>',
      'Brush.16.Up'
    ],
    requisites:{
      "1": {
        "dya321549q": {
          "pattern": [
            15,
            4,
            1
          ],
          "hasCycle": false,
          "initialValue": 1
        },
        "46dc27bcw7": {
          "pattern": [
            7,
            3,
            8,
            1,
            1
          ],
          "hasCycle": false,
          "initialValue": 1
        },
        "6b6u9h3m2x": {
          "pattern": [
            3,
            5,
            3,
            2
          ],
          "hasCycle": false,
          "initialValue": 1,
          "cycles": 3
        }
      },
      "2": {
        "dya321549q": {
          "pattern": [
            12,
            4,
            2,
            1,
            1
          ],
          "hasCycle": false,
          "initialValue": 1
        },
        "46dc27bcw7": {
          "pattern": [
            10,
            6,
            2,
            1,
            1
          ],
          "hasCycle": false,
          "initialValue": 1
        },
        "6b6u9h3m2x": {
          "pattern": [
            2,
            8
          ],
          "hasCycle": false,
          "initialValue": 1,
          "cycles": 3
        }
      },
      "3": {
        "dya321549q": {
          "pattern": [
            13,
            1,
            3,
            2,
            1
          ],
          "hasCycle": false,
          "initialValue": 1
        },
        "46dc27bcw7": {
          "pattern": [
            12,
            7,
            1
          ],
          "hasCycle": false,
          "initialValue": 1
        },
        "6b6u9h3m2x": {
          "pattern": [
            1,
            1,
            3,
            3
          ],
          "hasCycle": false,
          "initialValue": 1,
          "cycles": 4
        }
      }
    },
    optionalChallenges: {},
  },
  Decoder:{
    slug: 'Decoder',
    name: 'Обработчик шифров',
    description: '',
    map: sources.Decoder,
    allowedBrushList: [
      'Brush.0.Up',
      'Brush.5.Up',
      'Brush.6.Up.>',
      'Brush.9.Up',
      'Brush.10.Up.>',
      'Brush.13.Up.>',
      'Brush.15.Up',
      'Brush.14.Up'
    ],
    requisites:{},
    optionalChallenges: {},
  },
  Encoder:{
    slug: 'Encoder',
    name: 'Кодирование',
    description: '',
    map: sources.Encoder,
    allowedBrushList: [
      'Brush.0.Up',
      'Brush.5.Up',
      'Brush.6.Up.>',
      'Brush.9.Up',
      'Brush.10.Up.>',
      'Brush.13.Up.>',
      'Brush.15.Up',
      'Brush.14.Up'
    ],
    requisites:{},
    optionalChallenges: {},
  },
  SumOfUnits:{
    slug: 'SumOfUnits',
    name: 'Сумма единиц',
    description: '',
    map: sources.SumOfUnits,
    allowedBrushList: [
      'Brush.0.Up',
      'Brush.5.Up',
      'Brush.6.Up.>',
      'Brush.9.Up',
      'Brush.10.Up.>',
      'Brush.13.Up.>',
      'Brush.15.Up',
      'Brush.14.Up',
      'Brush.16.Up'
    ],
    requisites:{},
    optionalChallenges: {},
  },
  Adder: {
    slug: 'Adder',
    name: 'Сумматор',
    description: '',
    map: sources.Adder,
    allowedBrushList: [
      'Brush.0.Up',
      'Brush.5.Up',
      'Brush.6.Up.>',
      'Brush.9.Up',
      'Brush.10.Up.>',
      'Brush.13.Up.>',
      'Brush.15.Up',
      'Brush.14.Up',
      'Brush.16.Up'
    ],
    requisites: {},
    optionalChallenges: {},
  },
};
