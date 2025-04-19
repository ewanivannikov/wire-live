import { Button, Listbox, Popover, SegmentedButtons } from '../../shared';
import { createEffect, For, Show, useContext } from 'solid-js';
import { brushRepository } from '../../data/repositories';
import { createBrush } from './presenter';
import { iconDirectionMapping, iconsMapping } from '../brushes';
import { Dynamic } from 'solid-js/web';
import styles from './style.module.css';
import { InputArrow } from './InputArrow';
import { OutputArrow } from './OutputArrow';
import { Info } from 'lucide-solid';
import { WorldState } from '../worldState/viewModel';
import { WorldStateContext } from '../worldState/WorldStateContext';

const { contextbar } = styles;

export const ContextBar = () => {
  const worldState = useContext<WorldState>(WorldStateContext);
  const state = createBrush(worldState);

  createEffect(() => {
    state.initHotKeys();
  }, null);

  const handleClick = (el) => {
    state.setCurrentBrush(el.id);
  };

  return (
    <>
      <Show when={state.allowPanel}>
        <Show when={state.allowBrushes}>
          <Popover.Target popovertarget="brushes-info">
            <Info />
          </Popover.Target>
          <Popover id="brushes-info">
            <p>Позволяет рисовать знаки на поле</p>
            <p>Знаки делятся на несколько групп:</p>
            <ul>
              <For each={Object.entries(brushRepository.clastersBrushes)}>
                {([_, val]) => <li>{val.label}</li>}
              </For>
            </ul>
          </Popover>
          <div class={contextbar}>
            <label style={{ display: 'flex', 'align-items': 'center' }} id="sign-type">
              <span>Тип знака:</span>
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
                              <span
                                title={
                                  brushRepository.groupsBrushes[brush]
                                    .description
                                }
                              >
                                🛈
                              </span>
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
                      aria-label={direction}
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
            <InputArrow state={state} />
            <OutputArrow state={state} />
            {/* <Button onClick={state.runLearning}>Тык</Button> */}
          </div>
        </Show>
        <Show when={state.currentTool === 'Eraser'}>
          <Popover.Target popovertarget="eraser-info">
            <Info />
          </Popover.Target>
          <Popover id="eraser-info">Cтирает любую стрелочку с поля</Popover>
        </Show>
        <Show when={state.currentTool === 'Pan'}>
          <Popover.Target popovertarget="pan-info">
            <Info />
          </Popover.Target>
          <Popover id="pan-info">
            Даёт возможность нажимать на знаки-кнопки
          </Popover>
        </Show>
      </Show>
    </>
  );
};
