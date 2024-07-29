import {
  Listbox,
  Popover,
  SegmentedControl,
} from '../../shared';
import { For, Show } from 'solid-js';
import { groupsBrushes } from '../brushes';
import { createBrush } from './presenter';
import { ArrowUp, ArrowDown, ArrowRight, ArrowLeft } from 'lucide-solid';
import { iconsMapping } from '../brushes/IconArrow';
import { tools } from '../toolbar/presenter';
import { Dynamic } from 'solid-js/web';
import { contextbar } from './style.module.css';

export const ContextBar = () => {
  const state = createBrush(tools);
  const handleClick = (e) => {
    console.log('e.target.value', e.target.id);
    
    state.setCurrentBrush(e.target.id);
  };

  return (
    <Show when={state.allowBrushes}>
    <div class={contextbar}>
      <Popover.Target>
        <Dynamic component={iconsMapping[state.currentBrush]} />
      </Popover.Target>
        <Popover id="my-popover">
          <Listbox aria-activedescendant={state.currentBrush} onClick={handleClick}>
            <For each={Object.entries(groupsBrushes)}>
              {([key, val]) => (
                <Listbox.Option
                  id={key}
                  aria-selected={key === state.currentBrush}
                >
                  <Dynamic component={iconsMapping[key]} />
                  {val.label}
                </Listbox.Option>
              )}
            </For>
          </Listbox>
      </Popover>
      <Show when={state.hasDirection}>
        <SegmentedControl aria-orientation="horizontal">
          <SegmentedControl.Button
            value="Up"
            aria-label="Вверх"
            aria-pressed={state.currentBrushDirection === 'Up'}
            onClick={(e) => state.setBrushDirection(e.target.value)}
          >
            <ArrowUp />
          </SegmentedControl.Button>
          <SegmentedControl.Button
            value="Down"
            aria-label="Вниз"
            aria-pressed={state.currentBrushDirection === 'Down'}
            onClick={(e) => state.setBrushDirection(e.target.value)}
          >
            <ArrowDown />
          </SegmentedControl.Button>
          <SegmentedControl.Button
            value="Left"
            aria-label="Влево"
            aria-pressed={state.currentBrushDirection === 'Left'}
            onClick={(e) => state.setBrushDirection(e.target.value)}
          >
            <ArrowLeft />
          </SegmentedControl.Button>
          <SegmentedControl.Button
            value="Right"
            aria-label="Вправо"
            aria-pressed={state.currentBrushDirection === 'Right'}
            onClick={(e) => state.setBrushDirection(e.target.value)}
          >
            <ArrowRight />
          </SegmentedControl.Button>
        </SegmentedControl>
      </Show>
      </div>
    </Show>
  );
};
