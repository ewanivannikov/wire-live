import {
  NavigationMenu,
  Popover,
  ToggleGroup,
  navigationMenu,
  trigger,
} from '../../shared';
import { For, Show, Switch, Match } from 'solid-js';
import { brushIcons, groupsBrushes } from '../brushes';
import { createBrush } from './presenter';
import { ArrowUp, ArrowDown, ArrowRight, ArrowLeft } from 'lucide-solid';
import {
  IconArrowDown,
  IconArrowLeft,
  IconArrowRight,
  IconArrowUp,
  IconSourceBlock,
} from '../brushes/IconArrow';
import { tools } from '../toolbar/presenter';

export const ContextBar = () => {
  const state = createBrush(tools);
  const handleClick = (e) => {
    state.setCurrentBrush(e.target.name);
  };

  return (
    <Show when={state.allowBrushes}>
      <Popover>
        <Popover.Trigger class="popover__trigger">
          <Switch>
            <Match when={state.currentBrush === 'Brush.0.Up'}>
              <IconArrowUp />
            </Match>
            <Match when={state.currentBrush === 'Brush.0.Left'}>
              <IconArrowLeft />
            </Match>
            <Match when={state.currentBrush === 'Brush.0.Down'}>
              <IconArrowDown />
            </Match>
            <Match when={state.currentBrush === 'Brush.0.Right'}>
              <IconArrowRight />
            </Match>
            <Match when={state.currentBrush === 'Brush.1'}>
              <IconSourceBlock />
            </Match>
          </Switch>
        </Popover.Trigger>
        <Popover.Portal>
          <Popover.Content class="popover__content">
            <Popover.Arrow />
            <Popover.Description class="popover__description">
              <NavigationMenu class={navigationMenu} orientation="vertical">
                <NavigationMenu.Menu>
                  <For each={Object.entries(groupsBrushes)}>
                    {([key, val]) => (
                      <NavigationMenu.Trigger
                        name={key}
                        class={trigger}
                        onClick={handleClick}
                      >
                        <Switch>
                          <Match when={key === 'Brush.0.Up'}>
                            <IconArrowUp />
                          </Match>
                          <Match when={key === 'Brush.1'}>
                            <IconSourceBlock />
                          </Match>
                        </Switch>
                        {val.label}
                      </NavigationMenu.Trigger>
                    )}
                  </For>
                </NavigationMenu.Menu>
              </NavigationMenu>
            </Popover.Description>
          </Popover.Content>
        </Popover.Portal>
      </Popover>
      {' | '}
      <Show when={state.hasDirection}>
        <ToggleGroup class="toggle-group" value={state.currentBrushDirection}>
          <ToggleGroup.Item
            class="toggle-group__item"
            name="Up"
            aria-label="Bold"
            onClick={(e) => state.setBrushDirection(e.target.name)}
          >
            <ArrowUp />
          </ToggleGroup.Item>
          <ToggleGroup.Item
            class="toggle-group__item"
            name="Down"
            aria-label="Italic"
            onClick={(e) => state.setBrushDirection(e.target.name)}
          >
            <ArrowDown />
          </ToggleGroup.Item>
          <ToggleGroup.Item
            class="toggle-group__item"
            name="Left"
            aria-label="Underline"
            onClick={(e) => state.setBrushDirection(e.target.name)}
          >
            <ArrowLeft />
          </ToggleGroup.Item>
          <ToggleGroup.Item
            class="toggle-group__item"
            name="Right"
            aria-label="Underline"
            onClick={(e) => state.setBrushDirection(e.target.name)}
          >
            <ArrowRight />
          </ToggleGroup.Item>
        </ToggleGroup>
      </Show>
    </Show>
  );
};
