import { Show } from "solid-js";
import { Button, Modal, ModalFooter } from "../../../../shared";
import { Histogram } from "../../../../shared/ui/components/Histogram/Histogram";
import { taskPanelPresenter } from "../../../taskPanel/presenter";
import { worldState } from "../../viewModel";
import { stateBulkCheckingPresenter } from "./presenter";
import styles from './stateBulkCheckingModal.module.css';



export const StateBulkCheckingModal = () => {
  return (
    <Modal 
      open={worldState.status === 'level.checking.bulk'}
      title={taskPanelPresenter.title}
    >
      <h2>Дополнительные испытания:</h2>
      <h3>Количество стрелок</h3>
      <p>Ваше текущее решение использует {stateBulkCheckingPresenter.amountArrows} стрелок</p>
      <h3>Скорость обработки сигналов</h3>
      <Show when={stateBulkCheckingPresenter.status !== 'pending'}>
        <Histogram bars={stateBulkCheckingPresenter.challenges} classList={{ [styles.histogram]: true }} />
      </Show>
      
      <Show when={stateBulkCheckingPresenter.showAverageSteps}>
        <p>Ваше текущее решение выполняется, в среднем, за {stateBulkCheckingPresenter.averageSteps} ходов</p>
      </Show>
      <ModalFooter> <Button onClick={() => worldState.switchStatusOnLevelSolving()}>
        Назад
      </Button>
      <Show when={stateBulkCheckingPresenter.status === 'completed'}>
      <Button href="/" component="a">Дальше</Button> 
      </Show>
      </ModalFooter>
    </Modal>
  );
};
