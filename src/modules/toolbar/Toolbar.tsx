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

const { toolbar } = styles;

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
          aria-disabled={tools.disabledBrush}
          aria-pressed={tools.currentTool === 'Brush'}
          onClick={handleClick}
        >
          <Highlighter />
        </SegmentedButtons.Button>
        <SegmentedButtons.Button
          value="Eraser"
          aria-disabled={tools.disabledEraser}
          aria-pressed={tools.currentTool === 'Eraser'}
          onClick={handleClick}
        >
          <Eraser />
        </SegmentedButtons.Button>
        <SegmentedButtons.Button
          value="Pan"
          aria-pressed={tools.currentTool === 'Pan'}
          onClick={handleClick}
        >
          <Hand />
        </SegmentedButtons.Button>
      </SegmentedButtons>

      <Button
        name="Play"
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
            aria-pressed={tools.pressedSubmit}
            onClick={handleClickSend}
          >
            <SendHorizontal />
          </SegmentedButtons.Button>
          <SegmentedButtons.Button
            name="Write"
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
    </div>
  );
};
