import { worldState } from '../worldState';
import { LEVEL_MODE_STATUS_LABEL } from '../worldState/constants';
import { taskPanelPresenter } from './presenter';
import styles from './taskPanel.module.css';
const { taskPanel } = styles;


export const TaskPanel = () => {
  return (
    <div class={taskPanel}>
      <span>{LEVEL_MODE_STATUS_LABEL[worldState.status]}</span>
      <h1>{taskPanelPresenter.title}</h1>
      <div innerHTML={taskPanelPresenter.description} />
    </div>
  )
}
