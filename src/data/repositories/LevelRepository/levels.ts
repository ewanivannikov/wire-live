import { sources } from "./sources";

export const levels = {
  DeMorgan: {
    slug: 'de-morgan',
    name: 'De Morgan',
    description: 'В одном из прошлых уровней Вы использовали новую стрелку "и" с двумя вводами. Ваша задачи вывести те же результаты, но не используя стрелку "и".',
    map: sources.DeMorgan,
  },
  Sierpinski: {
    slug: 'sierpinski',
    name: 'Серпинского',
    description: 'Серпинского треугольника',
    map: sources.Sierpinski,
  }
}
