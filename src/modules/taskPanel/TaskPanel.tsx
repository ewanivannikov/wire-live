import { createEffect, useContext } from 'solid-js';
import { createTaskPanelPresenter } from './presenter';
import styles from './taskPanel.module.css';
import { WorldState } from '../worldState/viewModel';
import { WorldStateContext } from '../worldState/WorldStateContext';
const { taskPanel } = styles;

export const TaskPanel = () => {
  const worldState = useContext<WorldState>(WorldStateContext);
  const taskPanelPresenter = createTaskPanelPresenter(worldState);

  return (
    <div class={taskPanel}>
      <span>{taskPanelPresenter.status}</span>
      <h1>{taskPanelPresenter.title}</h1>
      <div innerHTML={taskPanelPresenter.description} />
    </div>
  );
};
