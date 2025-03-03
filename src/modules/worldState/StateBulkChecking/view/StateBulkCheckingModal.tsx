import { Show, useContext } from 'solid-js';
import { Button, Modal, ModalFooter } from '../../../../shared';
import { Histogram } from '../../../../shared/ui/components/Histogram/Histogram';
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
      <Show when={Boolean(worldState?.amountArrows)}>
      <h3>Количество стрелок</h3>
        <p>
          Ваше текущее решение использует{' '}
          {worldState?.amountArrows} стрелок
        </p>
      </Show>
      <h3>Скорость обработки сигналов</h3>
      <Histogram
        bars={worldState.challenges}
        classList={{ [styles.histogram]: true }}
      />

      <Show when={worldState.showAverageSteps}>
        <p>
          Ваше текущее решение выполняется, в среднем, за{' '}
          {worldState?.averageSteps} ходов
        </p>
      </Show>
      <ModalFooter>
        {' '}
        <Button onClick={() => worldState.switchStatusOnLevelSolving()}>
          Назад
        </Button>
        <Show when={worldState.statusCompleted === 'completed'}>
          <Button to="/" component={LinkRouter}>
            Дальше
          </Button>
        </Show>
      </ModalFooter>
    </Modal>
  );
};
