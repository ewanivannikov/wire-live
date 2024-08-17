import { Button, SegmentedControl } from '../../shared';
import styles from './style.module.css';
import { Highlighter, Eraser, Play, Pause } from 'lucide-solid';
import { tools } from './presenter';
import { Match, Switch } from 'solid-js';

const { toolbar } = styles;

export const Toolbar = () => {
  const handleClick = (e) => {
    tools.setCurrentTool(e.target.value);
  };
  const handleClickTick = () => {
    tools.setTick();
  };
  return (
    <div
      role="toolbar"
      aria-label="Управление игрой"
      aria-controls="canvas"
      class={toolbar}
    >
      <SegmentedControl>
        <SegmentedControl.Button
          value="Brush"
          aria-pressed={tools.currentTool === 'Brush'}
          onClick={handleClick}
        >
          <Highlighter />
        </SegmentedControl.Button>
        <SegmentedControl.Button
          value="Eraser"
          aria-pressed={tools.currentTool === 'Eraser'}
          onClick={handleClick}
        >
          <Eraser />
        </SegmentedControl.Button>
      </SegmentedControl>

      <Button
        name="Play"
        aria-pressed={tools.tick === 0}
        onClick={handleClickTick}
      >
        <Switch>
          <Match when={tools.tick === 0}>
            <Play />
          </Match>
          <Match when={tools.tick > 0}>
            <Pause />
          </Match>
        </Switch>
      </Button>
    </div>
  );
};
