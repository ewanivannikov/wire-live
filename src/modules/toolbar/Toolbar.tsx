import { Button, SegmentedButtons } from '../../shared';
import styles from './style.module.css';
import { Highlighter, Eraser, Play, Pause, Hand, Save } from 'lucide-solid';
import { tools } from './presenter';
import { Match, Switch } from 'solid-js';
import { worldState } from '../worldState';

const { toolbar } = styles;

export const Toolbar = () => {
  const handleClick = (e) => {
    tools.setCurrentTool(e.target.value);
  };
  const handleClickTick = () => {
    tools.setTick();
  };

  const handleClickSave = () => {
    tools.saveMap();
  };
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
          aria-pressed={tools.currentTool === 'Brush'}
          onClick={handleClick}
        >
          <Highlighter />
        </SegmentedButtons.Button>
        <SegmentedButtons.Button
          value="Eraser"
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
        aria-pressed={worldState.tick === 0}
        onClick={handleClickTick}
      >
        <Switch>
          <Match when={worldState.tick === 0}>
            <Play />
          </Match>
          <Match when={worldState.tick > 0}>
            <Pause />
          </Match>
        </Switch>
      </Button>
      <Button name="Save" onClick={handleClickSave}>
        <Save/>
      </Button>
    </div>
  );
};
