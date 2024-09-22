import { Listbox, Popover, SegmentedButtons } from '../../shared';
import { For, Show } from 'solid-js';
import { brushRepository } from '../../data/repositories';
import { createBrush } from './presenter';
import { iconDirectionMapping, iconsMapping } from '../brushes';
import { tools } from '../toolbar/presenter';
import { Dynamic } from 'solid-js/web';
import styles from './style.module.css';
import { InputArrow } from './InputArrow';
import { OutputArrow } from './OutputArrow';
import { Info } from 'lucide-solid';
import { worldState } from '../worldState';

const { contextbar } = styles;

export const ContextBar = () => {
  const state = createBrush(tools, worldState);
  const handleClick = (el) => {
    state.setCurrentBrush(el.id);
  };

  return (
    <>
    <Show when={state.allowBrushes}>
      <Popover.Target popovertarget="brushes-info">
        <Info />
      </Popover.Target>
      <Popover id="brushes-info">
        <p>
          Позволяет рисовать стрелочки на поле
        </p>
        <p>
          Стрелочки делятся на несколько групп:
        </p>
        <ul>
          <For each={Object.entries(brushRepository.clastersBrushes)}>
                    {([_, val]) => (
                      <li>{val.label}</li>
                    )}
          </For>
        </ul>
      </Popover>
      <div class={contextbar}>
        <label style={{ display: 'flex', 'align-items': 'center' }}>
          Тип стрелочки:
        <Popover.Target popovertarget="brushes">
          <Dynamic component={iconsMapping[state.currentBrush]} />
        </Popover.Target>
        <Popover id="brushes">
          <Listbox
            aria-activedescendant={state.currentBrush}
            onFocusChange={handleClick}
          >
            <For each={state.clastersBrushList}>
              {([_, val]) => (
                <Listbox.Optgroup label={val.label}>
                  <For each={val.values}>
                    {(brush) => (
                      <Listbox.Option id={brush}>
                        <Dynamic component={iconsMapping[brush]} />
                        <span title={brushRepository.groupsBrushes[brush].description}>🛈</span>
                        {brushRepository.groupsBrushes[brush].label}
                      </Listbox.Option>
                    )}
                  </For>
                </Listbox.Optgroup>
              )}
            </For>
          </Listbox>
        </Popover>
        </label>
        <Show when={state.hasDirection}>
          <SegmentedButtons aria-orientation="horizontal">
            <For each={state.currentBrushDirectionList}>
              {(direction) => (
                <SegmentedButtons.Button
                  value={direction}
                  aria-label="Вверх"
                  aria-pressed={state.currentBrushDirection === direction}
                  onClick={(e) => state.setBrushDirection(e.target.value)}
                >
                  <Dynamic component={iconDirectionMapping[direction]} />
                </SegmentedButtons.Button>
              )}
            </For>
          </SegmentedButtons>
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
        <InputArrow />
        <OutputArrow />
      </div>
    </Show>
    <Show when={tools.currentTool === 'Eraser'}>
      <Popover.Target popovertarget="eraser-info">
        <Info />
      </Popover.Target>
      <Popover id="eraser-info">
        Cтирает любую стрелочку с поля
      </Popover>
    </Show>
    <Show when={tools.currentTool === 'Pan'}>
      <Popover.Target popovertarget="pan-info">
        <Info />
      </Popover.Target>
      <Popover id="pan-info">
        Даёт возможность нажимать на стрелочки-кнопки
      </Popover>
    </Show>
    </>
  );
};
