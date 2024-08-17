import {
  Listbox,
  Popover,
  SegmentedControl,
} from '../../shared';
import { For, Show } from 'solid-js';
import { groupsBrushes } from '../brushes';
import { createBrush } from './presenter';
import { iconDirectionMapping, iconsMapping } from '../brushes/IconArrow';
import { tools } from '../toolbar/presenter';
import { Dynamic } from 'solid-js/web';
import { contextbar } from './style.module.css';

export const ContextBar = () => {
  const state = createBrush(tools);
  const handleClick = (el) => {
    state.setCurrentBrush(el.id);
  };

  return (
    <Show when={state.allowBrushes}>
      <div class={contextbar}>
        <Popover.Target>
          <Dynamic component={iconsMapping[state.currentBrush]} />
        </Popover.Target>
          <Popover id="my-popover">
            <Listbox aria-activedescendant={state.currentBrush} onFocusChange={handleClick}>
              <For each={Object.entries(groupsBrushes)}>
                {([key, val]) => (
                  <Listbox.Option
                    id={key}
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
            <For each={state.currentBrushDirectionList}>
              {(direction) => (
                <SegmentedControl.Button
                value={direction}
                aria-label="Вверх"
                aria-pressed={state.currentBrushDirection === direction}
                onClick={(e) => state.setBrushDirection(e.target.value)}
              >
                <Dynamic component={iconDirectionMapping[direction]} />
              </SegmentedControl.Button>
              )}
            </For>
          </SegmentedControl>
        </Show>
        <Show when={state.hasFlip}>
          <label style={{display: 'flex', "align-items": 'center'}} > 
            <input type="checkbox" onChange={(e) => state.setFlip(e.target.checked)}/>
            <span>Flip</span>
          </label>
        </Show>
      </div>
    </Show>
  );
};
