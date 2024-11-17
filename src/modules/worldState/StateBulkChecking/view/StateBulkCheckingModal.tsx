import { Button, Modal } from "../../../../shared";
import { Histogram } from "../../../../shared/ui/components/Histogram/Histogram";
import { taskPanelPresenter } from "../../../taskPanel/presenter";
import { worldState } from "../../viewModel";
import styles from './stateBulkCheckingModal.module.css';

const challenges = [
  {barColor: 'green', amount: 50},
  {barColor: 'tomato', amount: 100},
  {barColor: '#ccc', amount: 50},
]

export const StateBulkCheckingModal = () => {
  return (
    <Modal 
      open={worldState.status === 'level.checking.bulk'}
      title={taskPanelPresenter.title}
    >
      <h2>Optional square challenge</h2>
      <h2>Optional speed challenge</h2>
      <Histogram bars={challenges} classList={{ [styles.histogram]: true }} />
      <Button onClick={() => worldState.switchStatusOnLevelSolving()}>
        Назад
      </Button>
      <Button onClick={() => worldState.switchToCompleted()}>Дальше</Button>
    </Modal>
  );
};
