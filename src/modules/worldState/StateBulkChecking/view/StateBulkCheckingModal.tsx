import { Show, useContext } from 'solid-js';
import { Button, Modal, ModalFooter } from '../../../../shared';
import { Histogram } from '../../../../shared/ui/components/Histogram/Histogram';
import { stateBulkCheckingPresenter } from './presenter';
import styles from './stateBulkCheckingModal.module.css';
import { WorldState } from '../../viewModel';
import { WorldStateContext } from '../../WorldStateContext';
import { LinkRouter } from '../../../../shared/ui/components/LinkRouter';

export const StateBulkCheckingModal = () => {
  const worldState = useContext<WorldState>(WorldStateContext);
  return (
    <Modal
      open={worldState.status === 'level.checking.bulk'}
      // title={taskPanelPresenter.title}
    >
      <h2>Дополнительные испытания:</h2>
      <h3>Количество стрелок</h3>
      <p>
        Ваше текущее решение использует{' '}
        {stateBulkCheckingPresenter.amountArrows} стрелок
      </p>
      <h3>Скорость обработки сигналов</h3>
      <Show when={stateBulkCheckingPresenter.status !== 'pending'}>
        <Histogram
          bars={stateBulkCheckingPresenter.challenges}
          classList={{ [styles.histogram]: true }}
        />
      </Show>

      <Show when={stateBulkCheckingPresenter.showAverageSteps}>
        <p>
          Ваше текущее решение выполняется, в среднем, за{' '}
          {stateBulkCheckingPresenter.averageSteps} ходов
        </p>
      </Show>
      <ModalFooter>
        {' '}
        <Button onClick={() => worldState.switchStatusOnLevelSolving()}>
          Назад
        </Button>
        <Show when={stateBulkCheckingPresenter.status === 'completed'}>
          <Button to="/" component={LinkRouter}>
            Дальше
          </Button>
        </Show>
      </ModalFooter>
    </Modal>
  );
};
