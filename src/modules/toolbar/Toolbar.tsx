import { Button, SegmentedButtons } from '../../shared';
import styles from './style.module.css';
import {
  Highlighter,
  Eraser,
  Play,
  Pause,
  Hand,
  Save,
  SendHorizontal,
  Pencil,
} from 'lucide-solid';
import { createToolbarPresenter } from './presenter';
import { createEffect, Match, Show, Switch, useContext } from 'solid-js';
import { WorldState } from '../worldState/viewModel';
import { WorldStateContext } from '../worldState/WorldStateContext';
import { ProgressBar } from '../../shared/ui/components/ProgressBar';

const { toolbar, bar } = styles;

export const Toolbar = () => {
  const worldState = useContext<WorldState>(WorldStateContext);
  const tools = createToolbarPresenter(worldState);
  const handleClick = (e) => {
    tools.setCurrentTool(e.target.value);
  };
  const handleClickTick = () => {
    tools.setTick();
  };

  const handleClickSend = () => {
    tools.switchOnOneChecking();
  };

  const handleClickSolve = () => {
    tools.switchOnSolving();
  };

  const handleClickSave = () => {
    tools.saveMap();
  };
  // createEffect(() => {
  //   console.log('worldState.status', worldState);
  // })
  return (
    <div
      role="toolbar"
      aria-label="Управление игрой"
      aria-controls="canvas"
      class={toolbar}
    >
      <SegmentedButtons>
        <SegmentedButtons.Button
          value="Brush"
          title="Кисть"
          aria-disabled={tools.disabledBrush}
          aria-pressed={tools.currentTool === 'Brush'}
          onClick={handleClick}
        >
          <Highlighter />
        </SegmentedButtons.Button>
        <SegmentedButtons.Button
          value="Eraser"
          title="Ластик"
          aria-disabled={tools.disabledEraser}
          aria-pressed={tools.currentTool === 'Eraser'}
          onClick={handleClick}
        >
          <Eraser />
        </SegmentedButtons.Button>
        <SegmentedButtons.Button
          value="Pan"
          title="Рука"
          aria-pressed={tools.currentTool === 'Pan'}
          onClick={handleClick}
        >
          <Hand />
        </SegmentedButtons.Button>
      </SegmentedButtons>

      <Button
        name="Play"
        title={tools.isPaused ? 'Продолжить' : 'Пауза'}
        aria-disabled={tools.disabledPlay}
        aria-pressed={tools.isPaused}
        onClick={handleClickTick}
      >
        <Switch>
          <Match when={tools.isPaused}>
            <Play />
          </Match>
          <Match when={!tools.isPaused}>
            <Pause />
          </Match>
        </Switch>
      </Button>

      <Show when={tools.showLevelStateToggler}>
        <SegmentedButtons>
          <SegmentedButtons.Button
            name="Submit"
            title="Проверка"
            aria-pressed={tools.pressedSubmit}
            onClick={handleClickSend}
          >
            <SendHorizontal />
          </SegmentedButtons.Button>
          <SegmentedButtons.Button
            name="Write"
            title="Решение"
            aria-pressed={tools.pressedWrite}
            onClick={handleClickSolve}
          >
            <Pencil />
          </SegmentedButtons.Button>
        </SegmentedButtons>
      </Show>

      <Show when={tools.showSave}>
        <Button name="Save" onClick={handleClickSave}>
          <Save />
        </Button>
      </Show>

      {/* <ProgressBar  classList={{ [bar]: true }} value={tools.indicatorOutput}/> */}
    </div>
  );
};
