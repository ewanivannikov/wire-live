import { createEvent, createStore, sample } from 'effector';
import { tools } from '../mapContainer/application';

export const setCurrentTool = createEvent<string>();
export const $currentTool = createStore(tools.currentTool);

sample({
  clock: setCurrentTool,
  // source: $userName /* 2 */,
  fn: (tool) => {
    tools.setCurrentTool(tool);
    return tool;
  },
  target: $currentTool,
});
