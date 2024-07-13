import { createApi, createEvent, createStore, sample } from 'effector';
import { tools } from '../mapContainer/application';

import { brushes } from '../brushes';
import { $currentTool } from '../toolbar/presenter';

export const setCurrentBrush = createEvent<string>();
export const setBrushDirection = createEvent<string>();

export const $currentBrush = createStore('1.up');
export const $currentBrushDirection = createStore('up');
export const $hasDirection = createStore(true);
export const $allowBrushes = createStore(false);

sample({
  clock: $currentTool,
  fn: (toolId) => {
    return toolId === 'brush';
  },
  target: $allowBrushes,
});

sample({
  clock: setCurrentBrush,
  fn: (tool) => {
    tools.setCurrentTool(tool);

    return tool;
  },
  target: $currentBrush,
});

sample({
  clock: setCurrentBrush,
  // source: $userName /* 2 */,
  fn: (brushId) => {
    return Boolean(brushId.split('.')[1]);
  },
  target: $hasDirection,
});

sample({
  clock: setBrushDirection,
  source: $currentBrush /* 2 */,
  fn: (currentBrush, direction) => {
    const brushId = `${currentBrush.split('.')[0]}.${direction}`;
    tools.setCurrentTool(brushId);

    return direction;
  },
  target: $currentBrushDirection,
});

sample({
  clock: $currentBrushDirection,
  source: $currentBrush /* 2 */,
  fn: (currentBrush, direction) => {
    const brushId = `${currentBrush.split('.')[0]}.${direction}`;

    return brushId;
  },
  target: $currentBrush,
});
