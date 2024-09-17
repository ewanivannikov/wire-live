import { taskPanelPresenter } from './presenter';
import styles from './taskPanel.module.css';
const { taskPanel } = styles;
export const TaskPanel = () => {
  return (
    <div class={taskPanel}>
      <h1>{taskPanelPresenter.title}</h1>
      <p>{taskPanelPresenter.description}</p>
    </div>
  )
}
