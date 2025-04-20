import { useContext } from 'solid-js';
import { createTaskPanelPresenter } from './presenter';
import styles from './taskPanel.module.css';
import { WorldState } from '../worldState/viewModel';
import { WorldStateContext } from '../worldState/WorldStateContext';
import { Drawer } from '../../shared/ui/components/Drawer';
import { Typography } from '../../shared/ui/components/Typography';
const { taskPanel, heading } = styles;

export const TaskPanel = () => {
  const worldState = useContext<WorldState>(WorldStateContext);
  const taskPanelPresenter = createTaskPanelPresenter(worldState);

  return (
    <Drawer open={true} size="270px">
      <div id="task-panel" class={taskPanel}>
        <span>{taskPanelPresenter.status}</span>
        <Typography class={heading}>
          {taskPanelPresenter.title}
        </Typography>
        <div innerHTML={taskPanelPresenter.description} />
      </div>
     </Drawer>
  );
};
