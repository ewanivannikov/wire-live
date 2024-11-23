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
      <h2>Дополнительные испытания:</h2>
      <h3>Количество стрелок</h3>
      <p>Ваше текущее решение использует _ стрелок</p>
      <h3>Скорость обработки сигналов</h3>
      <p>Ваше текущее решение выполняется, в среднем, за _ ходов</p>
      <Histogram bars={challenges} classList={{ [styles.histogram]: true }} />
      <Button onClick={() => worldState.switchStatusOnLevelSolving()}>
        Назад
      </Button>
      <Button onClick={() => worldState.switchToCompleted()}>Дальше</Button>
    </Modal>
  );
};
