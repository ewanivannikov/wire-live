import { Listbox, Popover, SegmentedControl } from '../../shared';
import { For, Show } from 'solid-js';
import { groupsBrushes } from '../brushes';
import { createBrush } from './presenter';
import { iconDirectionMapping, iconsMapping } from '../brushes/IconArrow';
import { tools } from '../toolbar/presenter';
import { Dynamic } from 'solid-js/web';
import styles from './style.module.css';

const { contextbar } = styles;

export const ContextBar = () => {
  const state = createBrush(tools);
  const handleClick = (el) => {
    state.setCurrentBrush(el.id);
  };

  return (
    <Show when={state.allowBrushes}>
      <div class={contextbar}>
        <Popover.Target popovertarget="brushes">
          <Dynamic component={iconsMapping[state.currentBrush]} />
        </Popover.Target>
        <Popover id="brushes">
          <Listbox
            aria-activedescendant={state.currentBrush}
            onFocusChange={handleClick}
          >
            <For each={Object.entries(groupsBrushes)}>
              {([key, val]) => (
                <Listbox.Option id={key}>
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
          <label style={{ display: 'flex' }}>
            <input
              type="checkbox"
              onChange={(e) => state.setFlip(e.target.checked)}
            />
            <span>Flip</span>
          </label>
        </Show>
        <Show when={state.currentBrush.includes('Brush.21')}>
          <SegmentedControl aria-orientation="horizontal">
            <SegmentedControl.Button
              value={1}
              aria-label="1"
              aria-pressed={false}
              onClick={(e) => {}}
            >
              1
            </SegmentedControl.Button>
            <SegmentedControl.Button
              value={0}
              aria-label="0"
              aria-pressed={true}
              onClick={(e) => {}}
            >
              0
            </SegmentedControl.Button>
          </SegmentedControl>
          Initial value
          <label style={{ display: 'flex' }}>
            <input
              type="checkbox"
              onChange={(e) => {}}
            />
            <span>Cycle</span>
          </label>
          <Popover.Target popovertarget="signal-pattern">
            00110011...
          </Popover.Target>
          <Popover id="signal-pattern">
            <div>Signal pattern</div>
          </Popover>
        </Show>
      </div>
    </Show>
  );
};
