import { useContext } from 'solid-js';
import { createTaskPanelPresenter } from './presenter';
import styles from './taskPanel.module.css';
import { WorldState } from '../worldState/viewModel';
import { WorldStateContext } from '../worldState/WorldStateContext';
import { Drawer } from '../../shared/ui/components/Drawer';
const { taskPanel, heading } = styles;

export const TaskPanel = () => {
  const worldState = useContext<WorldState>(WorldStateContext);
  const taskPanelPresenter = createTaskPanelPresenter(worldState);

  return (
    <Drawer open={true} size="270px">
      <div id="task-panel" class={taskPanel}>
        <span>{taskPanelPresenter.status}</span>
        <h1 class={heading}>{taskPanelPresenter.title}</h1>
        <div innerHTML={taskPanelPresenter.description} />
      </div>
     </Drawer>
  );
};
